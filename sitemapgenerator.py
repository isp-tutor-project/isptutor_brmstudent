from datetime import date
from glob import glob

today = date.today().isoformat()

index_files = glob("*/index.html")

txt = """<?xml version="1.0" encoding="UTF-8"?>'
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">"""

for file_name in sorted(index_files):
    txt += """
    <url>
        <loc>https://go.isptutor.org/brm/%s</loc>
        <lastmod>%s</lastmod>"
        <changefreq>hourly</changefreq>"
    </url>""" % (file_name, today)

txt+= '\n</urlset>'

with open("sitemap.xml", "w") as fh:
    fh.write(txt)

