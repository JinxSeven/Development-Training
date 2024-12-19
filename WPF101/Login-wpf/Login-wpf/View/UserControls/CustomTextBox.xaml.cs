using System.Windows.Controls;
using System.Windows;

namespace Login_wpf.View.UserControls
{
    /// <summary>
    /// Interaction logic for CustomTextBox.xaml
    /// </summary>
    public partial class CustomTextBox : UserControl
    {
        public CustomTextBox()
        {
            InitializeComponent();
        }

        public static readonly DependencyProperty TextProperty =
            DependencyProperty.Register("Text", typeof(string), typeof(CustomTextBox),
                new FrameworkPropertyMetadata(string.Empty, FrameworkPropertyMetadataOptions.BindsTwoWayByDefault, OnTextChanged));

        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }

        private static void OnTextChanged(DependencyObject d, DependencyPropertyChangedEventArgs e)
        {
            if (d is CustomTextBox customTextBox)
            {
                customTextBox.TextBox.Text = (string)e.NewValue;
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

        private void TextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            Text = TextBox.Text;

            if (string.IsNullOrEmpty(TextBox.Text))
            {
                PlaceholderBlock.Visibility = Visibility.Visible;
            } 
            else
            {
                PlaceholderBlock.Visibility = Visibility.Hidden;
            }
        }

        private void ClearButton_Click(object sender, RoutedEventArgs e)
        {
            TextBox.Clear();
            TextBox.Focus();
        }
    }
}
