import os
from git import Repo

def escape_latex(s):
    # Escape all problematic characters for LaTeX
    return (s.replace('\\', '\\textbackslash ')
            .replace('{', '\\{')
            .replace('}', '\\}')
            .replace('#', '\\#')
            .replace('%', '\\%')
            .replace('&', '\\&')
            .replace('$', '\\$')
            .replace('_', '\\_')
            .replace('^', '\\textasciicircum ')
            .replace('~', '\\textasciitilde '))

def generate_git_file_tree(repo_path, output_file):
    repo = Repo(repo_path)
    tree = repo.head.commit.tree

    def recurse_tree(tree, path="", depth=0):
        lines = []
        indent = ' ' * 4 * depth
        for blob in tree.blobs:
            safe_name = escape_latex(blob.name)
            lines.append(f"{indent}\\text{{/{path}{safe_name}}}\\par")
        for subtree in tree.trees:
            safe_name = escape_latex(subtree.name)
            lines.append(f"{indent}\\text{{/{path}{safe_name}/}}\\par")
            lines.extend(recurse_tree(subtree, f"{path}{safe_name}/", depth + 1))
        return lines

    file_tree_lines = recurse_tree(tree)
    with open(output_file, 'w') as file:
        file.write("\n".join(file_tree_lines))

# Navigate to the script's directory
script_dir = os.path.dirname(__file__)  # Gets the directory where the script is located

# Construct the path to the repository root
# Assumes the script is run from within the 'Report' directory and the repo root is one level up
repo_path = os.path.abspath(os.path.join(script_dir, os.pardir))
output_file = 'filetree.tex'

generate_git_file_tree(repo_path, output_file)
