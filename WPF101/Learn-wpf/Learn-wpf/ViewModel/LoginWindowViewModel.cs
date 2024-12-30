using Login_wpf.Model;
using Login_wpf.MVVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace Login_wpf.ViewModel
{
    internal class LoginWindowViewModel : ViewModelBase
    {
        public ICommand LoginCommand { get; }
        public LoginWindowViewModel()
        {
            LoginCommand = new RelayCommand(OnLogin);
        }

        private void OnLogin()
        {
            List<RegUser> regUsers = RegDataStore.RegisteredUsers;

            foreach (var user in regUsers)
            {
                if (user.Email == Email && user.Password == Password)
                {
                    MessageBox.Show("Login Successfull!", $"Hi, {user.Username}", MessageBoxButton.OK, MessageBoxImage.Information);
                    return;
                }
            }
            MessageBox.Show($"Email or password incorrect", $"Login Failed!", MessageBoxButton.OK, MessageBoxImage.Error);
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
    }
}
