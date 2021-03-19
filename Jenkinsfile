// // Pipeline
// node('master') {
//     skipDefaultCheckout()

//     withEnv([
//         'name=cyril'
//     ]) {

//         docker.image('node:14-alpine').inside {
//             def repo
//             stage('Checkout') {
//                 repo = checkout([
//                     $class: 'GitSCM', 
//                     branches: [[name: params.branch]], 
//                     extensions: [], 
//                     userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
//                 ])
//             }

//             stage('Greeting') {
//                 echo "Hello! how are you"
//             }

//             stage('Build') {
//                 sh 'node --version'
//                 sh 'npm --version'
//                 sh 'npm install'
//             }

//             // stage('Test') {
//             //     sh 'npm test -- --no-watch --code-coverage'
//             // }
//         }
//     }
// }
// // Kill Agent

// // Input Step
// timeout(time: 15, unit: "MINUTES") {
//     stage('Input example') {
//         input(
//             id: 'Action',
//             message: 'Should we continue?', 
//             ok: 'yes', 
//             parameters: [
//                 choice(choices: ['proceed', 'abort', 'wait', 'notify'], description: '', name: 'ACTION'), 
//                 string(defaultValue: 'alice', description: '', name: 'PERSON', trim: false)
//             ],
//             submitter: 'alice,bob'
//         )
//         echo "Hello, $PERSON, nice to meet you."
//         echo "$ACTION"
//     }
// }

// Multibranch Pipeline
node('master') {
    skipDefaultCheckout()

    withEnv([
        'name=cyril'
    ]) {

        docker.image('node:14-alpine').inside {
            def repo
            stage('Checkout') {
                checkout scm
                // repo = checkout([
                //     $class: 'GitSCM', 
                //     branches: [[name: env.BRANCH_NAME]], 
                //     extensions: [], 
                //     userRemoteConfigs: [[credentialsId: 'github-cyril-sebastian', url: 'https://github.com/cyril-sebastian/angular-app.git']]
                // ])
            }

            stage('Greeting') {
                echo "Hello! how are you $CHANGE_ID"
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
        input(
            id: 'Action',
            message: 'Should we continue?', 
            ok: 'yes', 
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