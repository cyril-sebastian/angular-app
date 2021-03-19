node('master') {
    withEnv([
        'name=cyril'
    ]) {

        stage('Print environment variables') {
            echo "$name"
            echo "$params.branch"
            def branch_name = env.BRANCH_NAME
            echo "$branch_name"
            echo "$env.BRANCH_NAME"
        }

        
        // stage('Checkout') {
        //     checkout([
        //         $class: 'GitSCM', 
        //         branches: [[name: $env.branch]], 
        //         extensions: [], 
        //         userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
        //     ])
        // }
        docker.image('node:14-alpine').inside {
            // stage('Checkout') {
            //     checkout([
            //         $class: 'GitSCM', 
            //         branches: [[name: $branch]], 
            //         extensions: [], 
            //         userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
            //     ])
            // }

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