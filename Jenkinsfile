node('master') {
    skipDefaultCheckout()

    withEnv([
        'name=cyril'
    ]) {

        docker.image('node:14-alpine').inside {
            stage('Checkout') {
                checkout([
                    $class: 'GitSCM', 
                    branches: [[name: params.branch]], 
                    extensions: [], 
                    userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
                ])
            }

            stage('Greeting') {
                echo 'Hello! how are you'
            }

            stage('Build') {
                sh 'node --version'
                sh 'npm --version'
                sh 'cd angular-app'
                sh 'npm install'
            }

            stage('Test') {
                sh 'ng tests --watch=false'
            }
        }
    }
    

}