pipeline {
  agent any
  stages {
    stage('Install dependencies') {
      steps {
        nodejs('Node16.4') {
          sh 'npm install'
        }

      }
    }

    stage('Tests with Cucumber') {
      parallel {
        stage('User feature') {
          post {
            success {
              publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'User feature')
            }

          }
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Users"'
              }

            }

          }
        }

        stage('Pages feature') {
          post {
            success {
              publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'Pages feature report')
            }

          }
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Pages"'
              }

            }

          }
        }
      }
    }    
    
  }
  environment {
    DOCKER_HUB_USER = 'titosvir'
    DOCKER_HUB = credentials('Docker')
    TAG_VERSION = '1.0'
  }
  post {
    always {
        cucumber (buildStatus: 'UNSTABLE',
                failedFeaturesNumber: 1,
                failedScenariosNumber: 1,
                skippedStepsNumber: 1,
                failedStepsNumber: 1,
                classifications: [
                        [key: 'Commit', value: '<a href="${GERRIT_CHANGE_URL}">${GERRIT_PATCHSET_REVISION}</a>'],
                        [key: 'Submitter', value: '${GERRIT_PATCHSET_UPLOADER_NAME}']
                ],
                reportTitle: 'My report',
                fileIncludePattern: '**/*report.json',
                sortingMethod: 'ALPHABETICAL',
                trendsLimit: 100)
    }
    success {
      mail(to: 'titocaceres.carlos@gmail.com', subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) finished SUCCESFULLY!!", body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}")
    }

    failure {
      mail(to: 'titocaceres.carlos@gmail.com', subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) FAILED!!!", body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}")
    }

  }
}