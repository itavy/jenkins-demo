def label = "kube-agent-${UUID.randomUUID().toString()}"

def mongoUser = 'jenkins'
def mongoPass = 'jenkinsPassw0rd'
def mongoDB = 'jenkinsdb'

podTemplate(label: label, yaml: """
apiVersion: v1
kind: Pod
metadata:
  name: test-deploy
spec:
  volumes:
    - name: shared-data
      emptyDir: {}
  containers:
    - name: nodejs
      image: node:12.5.0-alpine
      command:
        - cat
      tty: true
    - name: mongodb
      image: mongo:4.0.10-xenial
      env:
        - name: MONGO_INITDB_ROOT_USERNAME
          value: "${mongoUser}"
        - name: MONGO_INITDB_ROOT_PASSWORD
          value: "${mongoPass}"
        - name: MONGO_INITDB_DATABASE
          value: "${mongoDB}"
"""
  ) {

  node(label) {
    stage('get repo') {
        git branch: 'feature/initial_release', url: 'https://github.com/itavy/jenkins-demo.git'
    }
    stage('populate mongodb') {
        container('mongodb') {
            sh """
            mongo -u ${mongoUser} --password=${mongoPass} --authenticationDatabase admin localhost:27017/${mongoDB} ./test/mongo.js
            """
        }
    }
    stage('add dependencies') {
        container('nodejs') {
            sh """
            npm install
            """
        }
    }
    stage('unit test') {
        container('nodejs') {
            sh """
            npm test
            """
        }
    }
  }
}
