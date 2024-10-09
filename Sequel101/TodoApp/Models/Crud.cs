using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoApp
{
    internal class Crud
    {
        const string dbPath = "sqLite.db";

        public static async Task AddTask(string task)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    string addTaskQuery = "INSERT INTO Task_Table (Task, Status) " +
                        "VALUES (@Task, 0);";

                    using (var insertCmd = new SqliteCommand(addTaskQuery, db, transaction))
                    {
                        insertCmd.Parameters.AddWithValue("@Task", task);
                        await insertCmd.ExecuteNonQueryAsync();
                    }

                    await transaction.CommitAsync();
                }

                Console.WriteLine("Task added successfully!\n");
            }
        }

        public static async Task MarkComplete(int taskId)
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                using (var transaction = db.BeginTransaction())
                {
                    string markCompleteQuery = "UPDATE Task_Table SET Status = 1" +
                        "WHERE Id = @TaskId;";
                    using (var updateCmd = new SqliteCommand(markCompleteQuery, db, transaction))
                    {
                        updateCmd.Parameters.AddWithValue("@TaskId", taskId);
                        int changedId = await updateCmd.ExecuteNonQueryAsync();

                        if (changedId != 0)
                        {
                            Console.WriteLine($"Task {taskId} updated!");
                        }
                        else
                        {
                            Console.WriteLine($"Task {taskId} not found!");
                        }
                    }
                }
            }
        }

        public static async Task DisplayTasks()
        {
            using (var db = new SqliteConnection($"Data Source={dbPath}"))
            {
                await db.OpenAsync();

                string displayTableQuery = "SELECT * FROM Task_Table;";

                using (var insertCmd = new SqliteCommand(displayTableQuery, db))
                {
                    using (var reader = await insertCmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            if (reader["Status"].ToString() == "0")
                            {
                                Console.Write($"{reader["Id"]}\t");
                                Console.Write($"{reader["Task"]}\t");
                                Console.Write($"Incomplete\n");
                            }
                            else
                            {
                                Console.Write($"{reader["Id"]}\t");
                                Console.Write($"{reader["Task"]}\t");
                                Console.Write($"Complete\n");
                            }
                        }
                        Console.WriteLine();
                    }
                }
            }
        }
    }
}
