from os import walk

dirs = []
for (dirpath, dirnames, filenames) in walk("."):
    dirs.extend(dirnames)
    break

dirs.remove("_assets")
dirs.remove(".git")
dirs.sort()
print(dirs)

file = ""
file += '<?xml version="1.0" encoding="UTF-8"?>'
file += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
for dir in dirs:
    file += "<url>"
    file += "<loc>" + "https://go.isptutor.org/brm/" + dir + "/index.html" + "</loc>"
    file += "<lastmod>2019-08-08</lastmod>"
    file += "<changefreq>weekly</changefreq>"
    file += "</url>"
file += '</urlset>'

'''
f = open("sitemap.xml", "w")
f.write(file)
f.close()
'''