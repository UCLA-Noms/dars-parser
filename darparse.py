#!/usr/bin/env python3

from bs4 import BeautifulSoup

def parseDar(html):
    soup = BeautifulSoup(html)
    # remove all script tags
    for script in soup(["script", "style"]):
        script.extract()
    # get text
    text = soup.get_text()
    # break into lines and remove leading and trailing space on each


    # remove all classes and inline styles
    for tag in soup.findAll(True):
        tag.attrs = {}
    # get text
    text = soup.get_text()
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each

    #print new html
    print(text)
    



if __name__ == '__main__':
    with open('./dars/mydar.html', encoding="windows-1252") as f:
        html = f.read()
    parseDar(html)