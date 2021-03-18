node {
    withEnv([
        'branch=${params.branch}'
    ]) {
        docker.image('node:14-alpine').inside {
            stage('Checkout') {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: $branch]], 
                    extensions: [], 
                    userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
                ])
            }

            stage('Greeting') {
                echo 'Hello! how are you'
            }

            stage('Build') {
                steps {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'cd angular-app'
                    sh 'npm install'
                }
            }

            stage('Test') {
                steps {
                    sh 'ng tests --watch=false'
                }
            }
        }
    }
    

}