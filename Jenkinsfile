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
}