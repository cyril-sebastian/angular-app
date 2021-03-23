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

    stage('Checkout') {
        checkout scm
        echo "$WORKSPACE"
    }

    docker.image('trion/ng-cli-karma').inside {
        stage('Greeting') {
            echo "Hello! how are you $BRANCH_NAME"
            sh 'node --version'
            sh 'npm --version'
        }

        stage('Build') {
            sh 'npm install'
            sh 'npm build'
        }

        stage('Test') {
            // sh 'npm test -- --no-watch --code-coverage'
            sh 'npm test -- --no-watch --code-coverage --no-progress --browsers=ChromeHeadless'
        }
    }

    stage('SonarQube') {
        def scannerHome = tool(name: 'sonarqube-scanner-4.6.0.2311', type: 'hudson.plugins.sonar.SonarRunnerInstallation');
        withSonarQubeEnv('sonarqube-server') {
            nodejs('nodejs-15.11.0') {
                sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=angular-app -Dsonar.projectName=angular-app -Dsonar.javascript.lcov.reportPaths=${WORKSPACE}/coverage/angular-app/lcov.info"
            }
        }
    }

    stage('Record Coverage') {
        if(env.CHANGE_ID != null) {
            currentBuild.result = 'SUCCESS';
            // step([$class: 'MasterCoverageAction', scmVars: [GIT_URL: env.GIT_URL]]);
            
            step([$class: 'MasterCoverageAction', jacocoCounterType: 'INSTRUCTION', publishResultAs: 'statusCheck', scmVars: [GIT_URL: env.GIT_URL]]);
        }
    }

    stage('PR Coverage to Github') {
        if(env.BRANCH_NAME == "main" && env.CHANGE_ID != null) {
            currentBuild.result = 'SUCCESS';
            step([$class: 'CompareCoverageAction', publishResultAs: 'statusCheck', scmVars: [GIT_URL: env.GIT_URL]])
        }
    }
}

stage("Quality Gate"){

    // Just in case something goes wrong, pipeline will be killed after a timeout
    timeout(time: 2, unit: 'MINUTES') {
        def qg = waitForQualityGate(); // Reuse taskId previously collected by withSonarQubeEnv
        if (qg.status != 'OK') {
            error "Pipeline aborted due to quality gate failure: ${qg.status}"
        }else {
            echo "status is ${qg.status}"
        }
    }
}