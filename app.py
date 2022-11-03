from flask import Flask, render_template, url_for, redirect, flash, request, jsonify
import requests
from datetime import datetime

app = Flask(__name__)
app.secret_key = "Dhrumil Patel"

@app.route('/')
def transfer():
    return render_template('listContracts.html')

@app.route('/create')
def create():
    return render_template('createContract.html')

@app.route('/uploadcard')
def uploadCard():
    return render_template('uploadcard.html')

@app.route('/contract/<int:contractId>')
def viewContract(contractId):
    return render_template('viewContract.html', contractId=contractId)

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/types')
def types():
    return render_template('types.html')


if __name__ == '__main__':
    app.run(debug=True)