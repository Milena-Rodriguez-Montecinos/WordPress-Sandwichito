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
  }

  stage('Tests with Cucumber') {

      parallel {
        stage('User feature') {
          steps {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Users"'
              }  
          }
          post{
            success {
              // publish html
              publishHTML target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: 'reports/',
                  reportFiles: 'report.html',
                  reportName: 'User feature'
                ]
              //send emails
              emailext (to: 'titocaceres.carlos@gmail.com', 
                subject: "Email Report from - '${env.JOB_NAME}' about the 'User feature'", 
                body: readFile("EXTRACTOR_SERVICE/coverage/lcov-report/index.html"), 
                mimeType: 'text/html');                
            }
          }

        }

        stage('Pages feature') {
          steps {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Pages"'
              }  
          } 
          post{
            success {
              // publish html
              publishHTML target: [
                  allowMissing: false,
                  alwaysLinkToLastBuild: false,
                  keepAll: true,
                  reportDir: 'report/',
                  reportFiles: 'report.html',
                  reportName: 'Machine Learning report'
                ]
              emailext (to: 'titocaceres.carlos@gmail.com', 
                subject: "Email Report from - '${env.JOB_NAME}' about the 'Pages feature'", 
                body: readFile("MLendPoint/coverage/lcov-report/index.html"), 
                mimeType: 'text/html');                
            }
          }                  
        }     
      }     
    }
}