using Microsoft.Win32;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
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

namespace DataBindings
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            DataContext = this;
            listEntries = new ObservableCollection<string>();
            InitializeComponent();
        }

        private ObservableCollection<string> listEntries;

        public ObservableCollection<string> ListEntries
        {
            get { return listEntries; }
            set 
            { 
                listEntries = value; 
            }
        }

        /*public void OnPropChange([CallerMemberName] string propName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propName));
        }*/

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            ListEntries.Add(TextBoxInput.Text);
            TextBoxInput.Clear();
            TextBoxInput.Focus();
        }

        private void DelButton_Click(object sender, RoutedEventArgs e)
        {
            if (ListViewEntries.SelectedItems.Count < 1)
            {
                MessageBox.Show("No items selected!", "Delete Failed!", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            else
            {
                int listIndex = ListViewEntries.SelectedIndex;
                ListViewEntries.Items.RemoveAt(listIndex);
            }
        }

        private void UpdButton_Click(object sender, RoutedEventArgs e)
        {
            if (ListViewEntries.SelectedItems.Count < 1)
            {
                MessageBox.Show("No items selected!", "Update Failed!", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            else
            {
                int listIndex = ListViewEntries.SelectedIndex;
                ListViewEntries.Items[listIndex] = TextBoxInput.Text;
                TextBoxInput.Clear();
                TextBoxInput.Focus();
            }
        }

        private void ClrButton_Click(object sender, RoutedEventArgs e)
        {
            if (ListViewEntries.Items.Count < 1)
            {
                MessageBox.Show("List view empty!", "Clear Failed!", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            else
            {
                MessageBoxResult res = MessageBox.Show($"Are you sure you want to clear {ListViewEntries.Items.Count} items!", "???", MessageBoxButton.YesNo, MessageBoxImage.Warning);
                if (res == MessageBoxResult.Yes)
                {
                    ListViewEntries.Items.Clear();
                }
            }
        }
    }
}