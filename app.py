import logging
import os
from logging.config import dictConfig

import requests
from flask import Flask, render_template, current_app, abort, url_for
from flask_weasyprint import render_pdf

app = Flask(__name__, static_folder=None)

logger = logging.getLogger("weasyprint")
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())


@app.route("/")
def index():
    templates = current_app.jinja_env.loader.list_templates()

    return render_template(
        "index.html",
        templates=[
            x.replace("pdf/", "")
            for x in templates
            if x.startswith("pdf/") and x.endswith(".html")
        ],
    )


@app.route("/<path:pdf_path>")
def preview(pdf_path):
    if not pdf_path.endswith(".html"):
        abort(404)
    template = os.path.join("pdf", pdf_path)

    current_app.jinja_env.get_template(template)

    return render_template("preview.html", pdf_path=pdf_path)


@app.route("/pdf/<path:pdf_path>")
def preview_pdf(pdf_path):
    return render_pdf(url_for("preview_html", pdf_path=pdf_path))


@app.route("/html/<path:pdf_path>")
def preview_html(pdf_path):
    return render_template(os.path.join("pdf", pdf_path))


@app.route("/static/<path:filename>")
def static(filename):
    response = requests.get("http://localhost:3000/{}".format(filename))
    return response.content, response.status_code, response.headers.items()
