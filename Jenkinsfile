node('master') {
    skipDefaultCheckout()

    withEnv([
        'name=cyril'
    ]) {

        docker.image('node:14-alpine').inside {
            def repo
            stage('Checkout') {
                repo = checkout([
                    $class: 'GitSCM', 
                    branches: [[name: params.branch]], 
                    extensions: [], 
                    userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
                ])
            }

            stage('Greeting') {
                echo "Hello! how are you"
            }

            stage('Build') {
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }

            // stage('Test') {
            //     sh 'npm test -- --no-watch --code-coverage'
            // }

            stage('Example') {
                input {
                    message "Should we continue?"
                    ok "Yes, we should."
                    submitter "alice,bob"
                    parameters {
                        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
                    }
                }
                steps {
                    echo "Hello, ${PERSON}, nice to meet you."
                }
            }
        }
    }
    

}