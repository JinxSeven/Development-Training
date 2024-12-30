using Login_wpf.Model;
using Login_wpf.MVVM;
using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Input;

namespace Login_wpf.ViewModel
{
    internal class MainWindowViewModel : ViewModelBase
    {
        public ICommand RegisterCommand { get; }
        public ICommand NavLoginCommand { get; }

        private string username;
        public string Username
        {
            get { return username; }
            set
            {
                username = value;
                OnPropertyChanged();
            }
        }

        private string email;
        public string Email
        {
            get { return email; }
            set { email = value; OnPropertyChanged(); }
        }

        private string password;
        public string Password
        {
            get { return password; }
            set { password = value; OnPropertyChanged(); }
        }

        private string confirmPassword;
        public string ConfirmPassword
        {
            get { return confirmPassword; }
            set { confirmPassword = value; OnPropertyChanged(); }
        }

        public MainWindowViewModel()
        {
            RegisterCommand = new RelayCommand(OnRegister);
        }

        //List<RegUser> RegisteredUsers = new List<RegUser>();

        Regex EmailRegex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");

        public void OnRegister()
        {
            string username = Username;
            bool vaildEmail;
            if (!string.IsNullOrEmpty(Email))
            {
                vaildEmail = EmailRegex.IsMatch(Email);
            }
            else
            {
                vaildEmail = false;
            }
            string password = Password;
            string confirmPassword = ConfirmPassword;

            if (vaildEmail && username != "" && password.Length > 7 && password == confirmPassword)
            {
                RegUser regUser = new RegUser()
                {
                    Username = username,
                    Email = Email,
                    Password = password
                };

                RegDataStore.RegisteredUsers.Add(regUser);

                MessageBox.Show($"Switch to login page", "User Registered!", MessageBoxButton.OK, MessageBoxImage.Information);

                Username = "";
                Email = "";
                Password = "";
                ConfirmPassword = "";
            }
            else
            {
                MessageBox.Show($"Username cant be empty!\nEmail must be valid!\nPassword must be greater than seven characters!\nPassword must match confirm password!", "Registration Failed! ", MessageBoxButton.OK, MessageBoxImage.Stop);
                
                Username = "";
                Email = "";
                Password = "";
                ConfirmPassword = "";
            }
        }
    }
}
