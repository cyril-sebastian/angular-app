def scmVars;
import com.github.terma.jenkins.githubprcoveragestatus.*;

// Multibranch Pipeline
node('master') {
    skipDefaultCheckout()

    stage('Checkout') {
        scmVars = checkout scm
        echo "$scmVars";
        env.GIT_URL = scmVars.GIT_URL;
        env.GIT_BRANCH = scmVars.GIT_BRANCH;
        // env.BRANCH_NAME = scmVars.BRANCH_NAME;
        env.CHANGE_TARGET = scmVars.CHANGE_TARGET;
        withCredentials([usernamePassword(credentialsId: 'github-token', passwordVariable: 'GITHUB_PWD', usernameVariable: 'GITHUB_USR')]) {
            env.DANGER_GITHUB_API_TOKEN=env.GITHUB_PWD;
        }
        echo "$WORKSPACE"
    }


    docker.image('trion/ng-cli-karma').inside("-e DANGER_GITHUB_API_TOKEN=$DANGER_GITHUB_API_TOKEN") {
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
            sh 'npm test -- --no-watch --code-coverage --no-progress --browsers=ChromeHeadless'
        }

        stage('Danger CI') {
            sh "npm run danger ci"
        }
    }

    // stage('SonarQube') {
    //     def scannerHome = tool(name: 'sonarqube-scanner-4.6.0.2311', type: 'hudson.plugins.sonar.SonarRunnerInstallation');
    //     withSonarQubeEnv('sonarqube-server') {
    //         nodejs('nodejs-15.11.0') {
    //             sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=angular-app -Dsonar.projectName=angular-app -Dsonar.typescript.lcov.reportPaths=${WORKSPACE}/coverage/angular-app/lcov.info"
    //         }
    //     }
    // }

    stage('Record Coverage') {
        if(env.BRANCH_NAME == "main" || env.BRANCH_NAME == "develop") {
            currentBuild.result = 'SUCCESS';
            echo "${fullBranchUrl(env.BRANCH_NAME)}"
            step([$class: 'MasterCoverageAction', jacocoCounterType: 'INSTRUCTION', scmVars: [GIT_URL: fullBranchUrl(env.BRANCH_NAME)]]);
            // step([$class: 'MasterCoverageAction', jacocoCounterType: 'INSTRUCTION', scmVars: [GIT_URL: env.GIT_URL, GIT_BRANCH: env.BRANCH_NAME]]);
        }
    }

    stage('PR Coverage to Github') {
        if(env.CHANGE_ID != null) {
            currentBuild.result = 'SUCCESS';
            echo "${fullBranchUrl(env.CHANGE_TARGET)}"
            // step([$class: 'CompareCoverageAction', publishResultAs: 'comment', jacocoCoverageCounter: 'INSTRUCTION', scmVars: [GIT_URL: fullBranchUrl(env.CHANGE_TARGET)]]);
            step([$class: 'CompareCoverageAction', jacocoCounterType: 'LINE', publishResultAs: 'comment', 
            scmVars: scmVars, 
            reportMetaDataList: [
                [$class: 'ReportMetaData', key: 'frontend', includes: 'angular-app']
            ]]);
        }
    }
}

// stage("Quality Gate"){
//     timeout(time: 2, unit: 'MINUTES') {
//         def qg = waitForQualityGate();
//         if (qg.status != 'OK') {
//             echo "Pipeline aborted due to quality gate failure: ${qg.status}"
//         } else {
//             echo "status is ${qg.status}"
//         }
//     }
// }

def fullBranchUrl(branchName) {
    def gitUrl = env.GIT_URL.split(/\.git/)[0];
    return "$gitUrl/tree/$branchName"
}
