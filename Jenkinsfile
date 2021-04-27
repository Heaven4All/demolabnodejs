pipeline {
    environment {
        pipelineBuildID = "FORM-AP"
    }
    stages {
        // Update
        stage("update") {
            steps {
                fortifyUpdate(
                    locale: 'en', 
                    updateServerURL: 'https://update.fortify.com'
                )
            }
        }

        // clean
        stage("clean") {
            //when {
            //    expression {
            //        true
            //    }
            //}
            steps {
                //fortifyClean addJVMOptions: '', buildID: 'FORM-AP', debug: true, logFile: 'form-AP-clean.log', maxHeap: '', verbose: true

                script {
                    if (isUnix()) {
                        System.out.println("TOto+")
                        sh(script: "echo monscript")
                    }
                    fortifyClean(
                        addJVMOptions: '',
                        buildID: "${env.pipelineBuildID}",
                        debug: true, 
                        logFile: 'form-AP-clean.log',
                        maxHeap: '',
                        verbose: true
                    )
                }
            }
        }

        // Translation
        stage ("translate") {
            steps {
                fortifyTranslate(
                    addJVMOptions: '', 
                    buildID: "${env.pipelineBuildID}", 
                    excludeList: '', 
                    logFile: '', 
                    maxHeap: '', 
                    projectScanType: fortifyOther(
                        otherIncludesList: '.', 
                        otherOptions: '-debug -verbose -logfile FORM-AP-tr.log -Dcom.fortify.sca.EnableDOMModeling=true -Dcom.fortify.sca.hoa.Enable=true -Dcom.fortify.sca.Phase0HigherOrder.Languages=javascript,typescript,python'
                    )
                )
            }
        }

        // Scan
        stage ("scan") {
            steps {
                fortifyScan(
                    addJVMOptions: '', 
                    addOptions: '', 
                    buildID: "${env.pipelineBuildID}", 
                    customRulepacks: '', 
                    debug: true, 
                    logFile: 'FORM-AP-sc.log', 
                    maxHeap: '', 
                    resultsFile: "${env.pipelineBuildID}.fpr", 
                    verbose: true
                )
            }
        }

        // Upload
        stage ("upload") {
            steps {
                fortifyUpload(
                    appName: 'LAB-FORMATIONAP', 
                    appVersion: '1.0', 
                    failureCriteria: '', 
                    filterSet: '', 
                    pollingInterval: '', 
                    resultsFile: "${env.pipelineBuildID}.fpr"
                )
            }
        }
    }
}
