import React from 'react'
import { View, Modal } from 'react-native'
export default class NoInternetModal extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Modal
                isVisible={show}
                style={styles.modal}
                animationInTiming={600}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Connection Error</Text>
                    <Text style={styles.modalText}>
                        Oops! Looks like your device is not connected to the
                        Internet.
                    </Text>
                    <Button onPress={onRetry} disabled={isRetrying}>
                        Try Again
                    </Button>
                </View>
            </Modal>
        )
    }
}
