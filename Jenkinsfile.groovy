def label = "kube-agent-${UUID.randomUUID().toString()}"

def mongoUser = 'jenkins'
def mongoPass = 'jenkinsPassw0rd'
def mongoDB = 'jenkinsdb'

def nodejs(Map conf = [:]) {
    def defaultMap = [
        name: 'nodejs',
        image: 'node:12.5.0-alpine'
    ];
    r = defaultMap << conf;
    return containerTemplate(
        name: r.name,
        image: r.image,
        ttyEnabled: true,
        command: 'cat'
    );
}

def mongodb(Map conf = [:]) {
    def defaultMap = [
        name: 'mongodb',
        user: '',
        pass: '',
        db: '',
        image: 'mongo:4.0.10-xenial'
    ];
    r = defaultMap << conf;
    return containerTemplate(
        name: r.name,
        image: 'mongo:4.0.10-xenial',
        envVars: [
            envVar(key: 'MONGO_INITDB_ROOT_USERNAME', value: r.user),
            envVar(key: 'MONGO_INITDB_ROOT_PASSWORD', value: r.pass),
            envVar(key: 'MONGO_INITDB_DATABASE', value: r.db),
        ],
        // ttyEnabled: true,
        // privileged: false,
        // alwaysPullImage: false,
        // workingDir: '/home/jenkins',
        // resourceRequestCpu: '50m',
        // resourceLimitCpu: '100m',
        // resourceRequestMemory: '100Mi',
        // resourceLimitMemory: '200Mi',
    );
}

podTemplate(
    label: label,
    containers: [
        nodejs(
            name: 'node-js'
        ),
        mongodb(
            name: 'mongo-db',
            user: mongoUser,
            pass: mongoPass,
            db:   mongoDB
        )
    ],
    // volumes: []
    // imagePullSecrets
    // annotations
) {

  node(label) {
    stage('get repo') {
        git branch: 'feature/initial_release', url: 'https://github.com/itavy/jenkins-demo.git'
    }
    stage('populate mongodb') {
        container('mongo-db') {
            sh """
            mongo -u ${mongoUser} --password=${mongoPass} --authenticationDatabase admin localhost:27017/${mongoDB} ./test/mongo.js
            """
        }
    }
    stage('add dependencies') {
        container('node-js') {
            sh """
            npm install
            """
        }
    }
    stage('unit test') {
        container('node-js') {
            sh """
            npm test
            """
        }
    }
  }
}
