import React, { useRef, useState, useEffect } from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet,
  TextInput 
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksEditProps {
  index: number;
  tasks: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ index, tasks, toggleTaskDone, removeTask, editTask }: TasksEditProps) {

    const [isEditingTask, setIsEditingTask] = useState(false);
    const [newTitleTask, setNewTitleTask] = useState(tasks.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
        setIsEditingTask(true);
    }

    function handleCancelEditing(){
        setIsEditingTask(false);
        setNewTitleTask(tasks.title);
    }

    function handleSubmitEditing(){
        editTask(tasks.id, newTitleTask);
        setIsEditingTask(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditingTask) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditingTask])
    
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(tasks.id)}
                >

                <View 
                    testID={`marker-${index}`}
                    style={tasks.done == true ? (styles.taskMarkerDone) : (styles.taskMarker)}
                >
                    
                    { tasks.done && (
                    <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                    )}
                </View>

                <TextInput 
                    style={tasks.done == true ? (styles.taskTextDone) : (styles.taskText)}
                    value={newTitleTask}
                    onChangeText={setNewTitleTask}
                    editable={isEditingTask}
                    onSubmitEditing={handleSubmitEditing}
                    ref={textInputRef}
                    
                >    
                </TextInput>
                </TouchableOpacity>
            </View>
            <View style={ styles.iconsContainer } >
                { isEditingTask ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                    <Icon 
                        name="x"
                        size={24}
                        color="#b2b2b2"
                    />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleStartEditing}
                        
                    >
                    <Image source={editIcon} />
                    </TouchableOpacity>
                )}

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    disabled={isEditingTask}
                    onPress={() => removeTask(tasks.id)}
                >
                <Image source={trashIcon} style={{ opacity: isEditingTask ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View> 
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    infoContainer: {
        flex: 1
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 8,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12,
        paddingRight: 24
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: "rgba(196,196,196,0.24)",
        marginHorizontal: 12
    }
    
  


})