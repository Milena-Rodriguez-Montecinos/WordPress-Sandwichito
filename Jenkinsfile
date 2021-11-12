pipeline {
  agent any
    stage('Install dependencies') {
          steps {
              nodejs('Node16.10') {
                sh 'npm install'
              }

          }
    }
}