using Login_wpf.Model;
using Login_wpf.View;
using Login_wpf.ViewModel;
using System.Text.RegularExpressions;
using System.Windows;

namespace Login_wpf
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            MainWindowViewModel mainWindowVM = new MainWindowViewModel();
            DataContext = mainWindowVM;
        }

        private void NavigateLogin_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }
    }
}