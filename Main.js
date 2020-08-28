import React from 'react'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
 
import{
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native'; 
 
const styles = StyleSheet.create({
    container:{
        flex: 1 
    }, 
    header: {  
        padding:10,
        paddingTop:30,  
    },
    headerText: {
        color:'white',
        fontSize: 30
    },
    navbar:{ 
        marginLeft:20,
        flexDirection: 'row',
        paddingTop:15
    },
    scrollContainer: {
        flex: 1,
    },
    TextInput:{
        alignSelf:'stretch', 
        padding:20,
        color:'#000000',
        backgroundColor:'#ededed'  
    },
    addButton:{
        position:'absolute',
        zIndex:11,
        right:20,
        bottom:40,
        backgroundColor:'#E91E63',
        width:55,
        height:55,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation:8
    }, note: {  
        borderBottomWidth:2,
        height:60,
        width:'100%',
        flex:4,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderBottomColor:'#ededed',
        marginRight:0,
        flexWrap:'wrap', 

    },
    month:{ 
        fontWeight: "bold",
        marginLeft:5, 
        marginTop:10,
        padding:5,
        width:'20%',
    }, 
});

const dayNames = ["Firday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday","Thursday"];

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"];

const d = new Date();

export default class Main extends React.Component{

    
    constructor(props){
        super(props);
        this.state={
            monthArray:[["JAN","",false,"#4287f5"],["FEB","Design Meeting at 2:00",true,"#4287f5"],["MARCH","",false,"#f5ef42"],["APRIL","Lunch Break",false,"#ce3df2"],["MAY","",false,"#f03759"],["JUNE","Catch up with Tom",false,"#f0a637"],["JULY","",false,"#51f03c"],["AUG","",false,"#7a9476"],["SEP","",false,"#4c378c"],["OCT","",false,"#ce3df2"],["NOV","",false,"#4287f5"],["DEC","",false,"#4287f5"],],
            noteText:'', 
            dialogVisible:false,
            date:new Date().getDate()
        }

    }
 
    render(){ 

        return(
            <View style={styles.container}> 
                 <ImageBackground source={require('./assets/sky_background.jpg') } style={{width:'100%'}}>
                    
                    <View style={{width:'100%',paddingTop:30,padding:10, flexDirection: 'row',justifyContent: 'space-between'}}>
                            <Icon name="list" size={20} color="#fff" />
                            <Icon name="search" size={20} color="#fff" />
                    </View> 
                    <View style={styles.header}> 
                        <Text style={styles.headerText}>{dayNames[d.getDay()]}</Text>
                        <Text style={{color:'white'}}>{monthNames[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear() }</Text>
                    </View>
                    <View style={styles.navbar} >
                        <Text style={{color:'white',padding:10}}>DAY</Text>
                        <Text style={{color:'white',padding:10}}>WEEK</Text>
                        <Text style={{color:'white',padding:10,textDecorationLine:'underline'}}>MONTH</Text>

                    </View>
                    
                </ImageBackground> 
            <ScrollView style={styles.scrollContainer}>
                {this.state.monthArray.map((obj,key) => ( 
                    <View key={key}  >
                        <TouchableOpacity style={styles.note} onPress={() => { 
                            if(this.state.noteText!='')
                            {
                                this.state.monthArray[key][1]= this.state.noteText
                                this.setState({monthArray:this.state.monthArray})  
                            }
                        }}>
                            <Text style={styles.month}>{obj[0]}</Text>
                            <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between',width:'80%',padding:10,height:'100%' ,backgroundColor:obj[1] ? obj[3] : ""}}>
                                <Text style={{paddingTop:5,color:'white'}}>{obj[1]}</Text>
                                <Icon style={{justifyContent:'flex-end'}} name="refresh" size={20} color="#fff" />
                            </View>
                       </TouchableOpacity>
                        
                        
                    </View>
                ))}
            </ScrollView> 
            <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
                
            <Dialog
                visible={this.state.dialogVisible}
                title="Write note"
				style={{visibility:'hidden'}}
                onTouchOutside={() => this.setState({dialogVisible: false})} >
                <View>
                <TextInput style={styles.TextInput} 
                    placeholder='note'
                    onChangeText={(noteText)=> this.setState({noteText})}
                    value={this.state.noteText}
                    placeholderTextColor='black'
                    underlineColorAndroid='transparent'>

                </TextInput>
                </View>
            </Dialog>


        </View>
        );
    }
    addNote(){   
        this.setState({dialogVisible: true})
    } 
 

}

