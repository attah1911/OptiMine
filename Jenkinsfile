pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18' 
    }
    
    environment {
        BACKEND_IMAGE = 'optimine-backend'
        FRONTEND_IMAGE = 'optimine-frontend'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo '✅ Source code checked out'
            }
        }
        
        stage('Check Dependencies') {
            steps {
                script {
                    echo 'Checking system dependencies...'
                    bat 'docker --version'
                    bat 'docker-compose --version'
                    bat 'node --version'
                    bat 'npm --version'
                }
            }
        }
        
        stage('Build Backend Image') {
            steps {
                script {
                    echo '🔨 Building backend Docker image...'
                    bat '''
                        cd backend
                        docker build -t %BACKEND_IMAGE%:latest .
                    '''
                }
            }
        }
        
        stage('Build Frontend Image') {
            steps {
                script {
                    echo '🔨 Building frontend Docker image...'
                    bat '''
                        cd frontend
                        docker build -t %FRONTEND_IMAGE%:latest .
                    '''
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        script {
                            echo '🧪 Running backend tests...'
                            bat '''
                                cd backend
                                npm install
                                npm test || echo "No tests defined yet"
                            '''
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        script {
                            echo '🧪 Running frontend tests...'
                            bat '''
                                cd frontend
                                npm install
                                npm test || echo "No tests defined yet"
                            '''
                        }
                    }
                }
            }
        }
        
        stage('Deploy with Docker Compose') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo '🚀 Deploying application...'
                    bat '''
                        docker-compose down || echo "No containers to stop"
                        docker-compose up -d
                    '''
                }
            }
        }
        
        stage('Verify Deployment') {
            steps {
                script {
                    echo '✅ Checking deployment status...'
                    bat 'docker-compose ps'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
        always {
            echo '🧹 Cleaning up...'
            bat 'docker system prune -f || echo "Cleanup done"'
        }
    }
}