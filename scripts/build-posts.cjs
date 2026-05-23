const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDir = path.join(__dirname, '..', 'posts');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'posts.json');


const files = fs.readdirSync(postsDir);

const markdownFiles = files.filter(file => path.extname(file) == ".md");

const posts = markdownFiles.map(file => {
    const filePath = path.join(postsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const slug = file.replace(/\.md$/, '');
    return {
        slug: slug,
        frontmatter: data,
        content: content
    }

});

posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
})

const jsonString = JSON.stringify(posts, null, 2);

fs.writeFileSync(outputFile, jsonString);

console.log(`Generated ${posts.length} posts to ${outputFile}`)