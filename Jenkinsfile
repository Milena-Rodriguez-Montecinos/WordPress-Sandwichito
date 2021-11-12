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
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Users"'
              }
            }
          }              
        }

        stage('Pages feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Pages"'
              }
            }
          }
          post {
            always {
              publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'Cucumber report2')
            }
           }           
        }

        stage('Categories feature') {
          steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Categories"'
              }
            }
          }
          post {
            always {
              publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'Cucumber report2')
            }
           }           
        }
      }
    }


    stage('Reports') {
        steps {
         publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'Cucumber report1')
        cucumber (
                reportTitle: 'My report',
                fileIncludePattern: 'reports/report.json',
                )
        echo "CUCUMBER tests report: ${BUILD_URL}cucumber-html-reports/overview-features.html"
        }
    }        
    
  }
  environment {
    DOCKER_HUB_USER = 'titosvir'
    DOCKER_HUB = credentials('Docker')
    TAG_VERSION = '1.0'
  }
  post {

    success {
      mail(to: 'titocaceres.carlos@gmail.com', subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) finished SUCCESFULLY!!", body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}")
    }

    failure {
      mail(to: 'titocaceres.carlos@gmail.com', subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) FAILED!!!", body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}")
    }

  }
}