def apply_modifications(content):
    # Layout & Spacing
    content = content.replace('p-6', 'p-4')
    content = content.replace('mb-8', 'mb-4')
    content = content.replace('mb-6', 'mb-4')
    content = content.replace('gap-6', 'gap-4')
    content = content.replace('p-5', 'p-3')

    # Main Header
    content = content.replace('text-4xl', 'text-2xl')

    # Graphs
    content = content.replace('h-64', 'h-40')

    # Summary Cards Icons
    content = content.replace('text-6xl', 'text-5xl')
    content = content.replace('-right-4 -bottom-4', '-right-2 -bottom-2')
    content = content.replace('text-xl font-bold', 'text-lg font-bold')

    # Panel Headers
    content = content.replace('px-5 py-3', 'px-3 py-2')

    # Table Headers & Cells padding
    content = content.replace('py-3 px-4', 'py-1.5 px-2')

    # JS generation - List Item paddings
    content = content.replace('<li class="py-3 flex justify-between items-center">', '<li class="py-1.5 flex justify-between items-center">')
    content = content.replace('<li class="py-4 text-center', '<li class="py-2 text-center')

    # JS generation - News list spacing
    content = content.replace('<ul id="newsList" class="space-y-4">', '<ul id="newsList" class="space-y-2">')

    # JS generation - CEO row
    content = content.replace('py-6 text-center text-red-500', 'py-3 text-center text-red-500')

    return content

def main():
    with open('index.html', 'r') as f:
        content = f.read()

    new_content = apply_modifications(content)

    with open('index.html', 'w') as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
