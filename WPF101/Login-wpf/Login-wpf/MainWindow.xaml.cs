using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Login_wpf
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        public void OnLogin(Object sender, RoutedEventArgs e)
        {
            string username = UsernameInput.Text;
            string password = PasswordInput.Password;

            if (username == "" || password == "")
            {
                MessageBox.Show($"Invalid username or password", "Error", MessageBoxButton.OK, MessageBoxImage.Stop);
            } else
            {
                MessageBox.Show($"Logged in successfully: {username} - {password}", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }
    }
}