pipeline {
  agent any
    environment {
    DOCKER_HUB_USER = 'titosvir'
    DOCKER_HUB = credentials('docker')
    TAG_VERSION = '1.0'
    REPOSITORY_NAME = 'ct_services'
    SONAR_TOKEN = credentials('sonar_tocken')
  }
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
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@Users-CRUD"'
                //sh 'npm run test -- --tags "@Users"'
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
              /*emailext (to: 'titocaceres.carlos@gmail.com', 
                subject: "Email Report from - '${env.JOB_NAME}' about the 'User feature'", 
                body: readFile("EXTRACTOR_SERVICE/coverage/lcov-report/index.html"), 
                mimeType: 'text/html');           */     
            }
          }

        }

        stage('Pages feature') {
          steps {
              nodejs('Node16.4') {
                sh 'npm run test -- --tags "@PAGE-CRUD"'
                //sh 'npm run test -- --tags "@Pages"'
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
                  reportName: 'Pages feature report'
                ]
              /*emailext (to: 'titocaceres.carlos@gmail.com', 
                subject: "Email Report from - '${env.JOB_NAME}' about the 'Pages feature'", 
                body: readFile("MLendPoint/coverage/lcov-report/index.html"), 
                mimeType: 'text/html');     */           
            }
          }                  
        }     
      }     
    }    

    stage('Package-the project') {

      steps {
              sh 'docker build -t at14-team2:"${TAG_VERSION}" .'
          }  
    }

    /*stage('Publishing') {
          steps {
            sh 'docker login -u "${DOCKER_HUB_USR}" -p "${DOCKER_HUB_PSW}"'
            sh 'docker tag extractor_service:"${TAG_VERSION}" "${DOCKER_HUB_USER}"/extractor_service:"${TAG_VERSION}"'
            sh 'docker push "${DOCKER_HUB_USER}"/extractor_service:"${TAG_VERSION}"'
          }
    }  */
  }
   post {
   success {
    mail to: 'titocaceres.carlos@gmail.com',
      subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) finished SUCCESFULLY!!", 
      body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}"          
      }
    failure {
      mail to: 'titocaceres.carlos@gmail.com',
        subject: "Build: (${BUILD_DISPLAY_NAME}) from branch (${BRANCH_NAME}) FAILED!!!", 
        body: "To view more details about it : ${BUILD_URL} -- ${RUN_ARTIFACTS_DISPLAY_URL}"          
      }        
  }   


}