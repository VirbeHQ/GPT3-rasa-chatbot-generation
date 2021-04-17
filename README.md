# Instalation
1. Make sure you have python 3.7 installed and upgrade pip
```
pip install --upgrade pip
```
1. Install the virtual env and pipenv
```
pip3 install virtualenv pipenv
```
1. (Optional) Create and activate the virtualenv
```
Mac: pipenv shell
```
1. Install project with pipenv
```
pipenv install 
```

# Running Rasa demo sample
1. How to run rasa in console
```
cd rasa-demo/
# First make sure you have trained a model with 
rasa train
# Next you can test your model with the following script 
rasa shell
```
1. How to run rasa with Docker
```
# First make sure you have trained a model with 
docker run -v $(pwd)/rasa-demo:/app rasa/rasa:2.5.0-full train --domain domain.yml --data data --out models
# Next you can test your model with the following script 
docker run -it -v $(pwd)/rasa-demo:/app rasa/rasa:2.5.0-full shell
```