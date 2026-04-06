import unittest
from unittest.mock import patch, mock_open
import modify

class TestModify(unittest.TestCase):
    def test_apply_modifications_layout(self):
        content = "class='p-6 mb-8 gap-6 p-5'"
        expected = "class='p-4 mb-4 gap-4 p-3'"
        self.assertEqual(modify.apply_modifications(content), expected)

    def test_apply_modifications_header(self):
        content = "class='text-4xl'"
        expected = "class='text-2xl'"
        self.assertEqual(modify.apply_modifications(content), expected)

    def test_apply_modifications_graphs(self):
        content = "class='h-64'"
        expected = "class='h-40'"
        self.assertEqual(modify.apply_modifications(content), expected)

    def test_apply_modifications_icons(self):
        content = "class='text-6xl -right-4 -bottom-4 text-xl font-bold'"
        expected = "class='text-5xl -right-2 -bottom-2 text-lg font-bold'"
        self.assertEqual(modify.apply_modifications(content), expected)

    def test_apply_modifications_js_generation(self):
        content = '<li class="py-3 flex justify-between items-center"> <li class="py-4 text-center <ul id="newsList" class="space-y-4"> py-6 text-center text-red-500'
        expected = '<li class="py-1.5 flex justify-between items-center"> <li class="py-2 text-center <ul id="newsList" class="space-y-2"> py-3 text-center text-red-500'
        self.assertEqual(modify.apply_modifications(content), expected)

    @patch("builtins.open", new_callable=mock_open, read_data="p-6 text-4xl")
    def test_main_execution(self, mock_file):
        # Trigger the main function
        modify.main()

        # Check if index.html was read
        mock_file.assert_any_call('index.html', 'r')

        # Check if index.html was written
        mock_file.assert_any_call('index.html', 'w')

        # Capture what was written
        handle = mock_file()
        written_content = "".join(call.args[0] for call in handle.write.call_args_list)

        # Verify written content (mock_file's read_data "p-6 text-4xl" should be transformed)
        self.assertIn("p-4 text-2xl", written_content)

if __name__ == "__main__":
    unittest.main()
