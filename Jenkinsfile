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
          post {
            success {
              publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'User feature')
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
         
        }
      }
      post {
        success {
          publishHTML(allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'reports/', reportFiles: 'report.html', reportName: 'Pages feature report')
        }
      }       
    }

    stage('Reports') {
        steps {
        cucumber (
                reportTitle: 'My report',
                fileIncludePattern: 'reports/report.json',
                )
        publishHTML(target:
          [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true,
          reportDir: 'doc/internal/html', reportFiles: 'index.html', reportName:
          'DOC', reportTitles: ''])
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