using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data;
using TaskTracker.Data;
using TaskTracker.Models;
using TaskTracker.Models.DTOs;

namespace TaskTracker.Repo
{
    public class ComplianceRepo
    {
        private readonly IDataAccess _dataAccess;

        public ComplianceRepo(IDataAccess dataAccess)
        {
            _dataAccess = dataAccess;
        }

        public async System.Threading.Tasks.Task AddNewComplianceAsync(Compliance compliance)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();
                using (SqlCommand cmd = new SqlCommand("usp_AddCompliance", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    // Compliance Details
                    cmd.Parameters.AddWithValue("@comp_name", compliance.Title);
                    cmd.Parameters.AddWithValue("@comp_description", compliance.Description);
                    cmd.Parameters.AddWithValue("@req_percentage", compliance.RequiredPercentage);
                    cmd.Parameters.AddWithValue("@created_by", compliance.CreatedBy); // Change as needed

                    // Presentation Details (Check if file exists)
                    if (compliance.Presentation != null)
                    {
                        cmd.Parameters.AddWithValue("@file_name", compliance.Presentation.FileName);
                        if (compliance.Presentation.FileData != null)
                        {
                            cmd.Parameters.Add("@file_data", SqlDbType.VarBinary, -1).Value = compliance.Presentation.FileData;
                        }
                        else
                        {
                            cmd.Parameters.Add("@file_data", SqlDbType.VarBinary, -1).Value = DBNull.Value;
                        }
                    }
                    else
                    {
                        cmd.Parameters.AddWithValue("@file_name", DBNull.Value);
                        cmd.Parameters.AddWithValue("@file_data", DBNull.Value);
                    }

                    // Convert Questions List to JSON
                    string jsonQuestions = JsonConvert.SerializeObject(compliance.Questions);

                    Console.WriteLine(jsonQuestions);

                    cmd.Parameters.AddWithValue("@questions", jsonQuestions);

                    await cmd.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<List<ComplianceDTO>?> GetComplianceDetails()
        {
            List<ComplianceDTO> compsList = new List<ComplianceDTO>(); 

            using (var connection = _dataAccess.ReturnConn())
            {
                await connection.OpenAsync();

                SqlCommand getCompliance = new SqlCommand("usp_GetComplianceDetails", connection);
                SqlDataReader Reader = await getCompliance.ExecuteReaderAsync();

                while (await Reader.ReadAsync())
                {
                    decimal requiredPercentage = (decimal)Reader["req_percentage"]!;

                    compsList.Add(new ComplianceDTO
                    {
                        Id = Guid.Parse(Reader["id"].ToString()!),
                        Title = Reader["comp_name"].ToString()!,
                        Description = Reader["comp_description"].ToString()!,
                        RequiredPercentage = (double)requiredPercentage,
                        CreatedBy = Reader["created_by"].ToString()!,
                        CreatedDate = (DateTime)Reader["created_date"]!,
                        QuestionsCount = Convert.ToInt32(Reader["quest_count"].ToString()!)
                    });
                }
            }

            return compsList;
        }

        public async Task<int> AssignCompliance(Guid userId, Guid compId)
        {
            using (SqlConnection conn = _dataAccess.ReturnConn())
            {
                await conn.OpenAsync();
                SqlCommand checkCmd = new("usp_IsComplianceAlreadyAssigned", conn);
                checkCmd.Parameters.AddWithValue("@user_id", userId);
                checkCmd.Parameters.AddWithValue("@comp_id", compId);

                int res = (int)checkCmd.ExecuteScalar();

                if (res == 1)
                {
                    throw new Exception("Compliance has already been assigned!");
                }

                SqlCommand assignCmd = new
                    (
                    "INSERT INTO UserCompliances (user_id, comp_id) VALUES (@user_id, @comp_id)", conn
                    );
                assignCmd.Parameters.AddWithValue("@user_id", userId);
                assignCmd.Parameters.AddWithValue("@comp_id", compId);

                return await assignCmd.ExecuteNonQueryAsync();
            }
        }
    }
}
