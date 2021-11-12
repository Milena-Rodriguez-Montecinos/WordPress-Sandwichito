pipeline {
  agent any
  stages {
    stage('Install dependencies') {
          steps {
              nodejs('Node16.10') {
                sh 'npm install'
              }

          }
    }
  }
}