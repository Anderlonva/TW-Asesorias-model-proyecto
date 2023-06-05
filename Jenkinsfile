pipeline{
    agent any

    stages {
        stage(' Clonar repositorio'){
            steps {
                git branch: 'main', credentialsId: 'git-module-proyecto', url: 'https://github.com/Anderlonva/TW-Asesorias-model-proyecto.git'

            }
        }
        stage(' Hacer el build al proyecto'){
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                    ]) {
                        docker.build('anderlonva/asesorias-module-proyecto:1.0.1', '--build-arg MONGO_URL=${MONGO_URL} .')
                        }
                }   
            }

        }
        stage('Desplegar con docker-compose'){
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URL', variable: 'MONGO_URL')
                    ]) {
                    sh """
                        sed 's|\\${MONGO_URL}|${MONGO_URL}|g' docker-compose.yml > docker-compose-update.yml
                        docker-compose -f docker-compose-update.yml up -d 
                    """
                    }
                    
                }
            }
        }
    }

    post {
        always {
            emailext {
                subject: "Estado del build: ${currentBuild.currentResult}",
                body:"Se ha completado el despliegue. Ver detalles: ${env.BUILD_URL}",
                to: "anderson.valencia@est.iudigital.edu.co",
                from: "jenkins@iudigital.edu.co"
            }
        }
    }
}

//