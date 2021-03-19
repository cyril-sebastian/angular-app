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
        }
    }
}
// Kill Agent

// Input Step
timeout(time: 15, unit: "MINUTES") {
    stage('Input example') {
        // input(message: "Should we continue?", ok: "y", submitter: "alice,bob", )
        //     parameters {
        //         string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
        //         choice(choices: ['proceed', 'abort', 'wait', 'notify'], description: '', name: 'ACTION')
        //     }
        // }
        input(
            id: 'Action',
            message: 'Should we continue?', 
            ok: 'y', 
            parameters: [
                choice(choices: ['proceed', 'abort', 'wait', 'notify'], description: '', name: 'ACTION'), 
                string(defaultValue: 'alice', description: '', name: 'PERSON', trim: false)
            ],
            submitter: 'alice,bob'
        )
        echo "Hello, $PERSON, nice to meet you."
        echo "$ACTION"
    }
}