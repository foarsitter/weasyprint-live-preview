# Weasyprint live preview

This repo tries to improve the DX when design an PDF with Weasyprint. 

It uses a Flask server to render the PDF and Webpack to watch the changes in the CSS and HTML files to perform a reload.

# Setup

## Flask
Install the requirements, preferred in a virtualenv

```
pip install -r requirements.txt
```

Run the flask server

```
flask run -p 5000 --debug
```

## Webpack

```
npm install --dev
```

Run the webpack dev server, opens the browser at http://localhost:3000

```
npm run serve
```


# Usage

Each .html page inside the template/pdf file is shown in the index and can be previewed.  