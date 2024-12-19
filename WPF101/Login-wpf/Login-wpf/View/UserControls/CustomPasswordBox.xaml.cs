using System.Windows.Controls;
using System.Windows;

namespace Login_wpf.View.UserControls
{
    /// <summary>
    /// Interaction logic for CustomTextBox.xaml
    /// </summary>
    public partial class CustomPasswordBox : UserControl
    {
        public CustomPasswordBox()
        {
            InitializeComponent();
        }

        public static readonly DependencyProperty PasswordProperty = 
            DependencyProperty.Register("Password", typeof(string), typeof(CustomPasswordBox), new FrameworkPropertyMetadata(string.Empty, FrameworkPropertyMetadataOptions.BindsTwoWayByDefault, OnPasswordChanged));

        public string Password
        {
            get { return (string)GetValue(PasswordProperty); }
            set { SetValue(PasswordProperty, value); }
        }

        private static void OnPasswordChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is CustomPasswordBox customPasswordBox && customPasswordBox.PasswordBox.Password != (string)e.NewValue)
            {
                customPasswordBox.PasswordBox.Password = (string)e.NewValue;
            }
        }

        private string placeholder;

        public string Placeholder
        {
            get { return placeholder; }
            set
            {
                placeholder = value;
                PlaceholderBlock.Text = placeholder;
            }
        }

        public string Text { get; internal set; }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            PasswordBox.Clear();
            PasswordBox.Focus();
        }

        private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
        {
            Password = PasswordBox.Password;

            if (string.IsNullOrEmpty(PasswordBox.Password))
            {
                PlaceholderBlock.Visibility = Visibility.Visible;
            }
            else
            {
                PlaceholderBlock.Visibility = Visibility.Hidden;
            }
        }
    }
}
