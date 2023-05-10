import React from 'react';
import { useNavigate } from 'react-router-dom';
import TermsCss from './css/Terms.module.css';
import Header from './Header';
import Footer from './Footer';


const Terms = () => {


    const navigate = useNavigate();
    const registerRedirect = () => {navigate('/register');}
    
    return ( 
        <div className={TermsCss['wrapper']}>
            <Header/>
                <div className={TermsCss['content-box']}>
            
                <p className={TermsCss['welcome-mess']}>Our Terms & Conditions</p>

                <div className={TermsCss['content']}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin arcu enim, vestibulum mollis laoreet at, consequat lacinia mauris. Donec commodo lobortis nisi eu blandit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras a orci convallis, interdum orci nec, varius sem. Nullam mollis lobortis ligula. Aenean hendrerit neque a nibh rutrum ornare. Nulla consectetur ipsum a dictum interdum. Sed lectus nisi, vehicula ac metus non, euismod finibus nulla. Quisque laoreet nisl eu enim pharetra sagittis.</p>
                <p>Nunc sed diam a sapien porttitor dapibus feugiat ut libero. Donec malesuada enim nisi, lacinia placerat lectus lacinia rutrum. Maecenas at est tincidunt, varius libero eget, viverra felis. Donec et rutrum turpis. Sed ante nunc, pellentesque a sodales feugiat, viverra a nisl. Morbi accumsan interdum mauris, id viverra nisl eleifend at. Phasellus fermentum urna vitae sapien pellentesque, ut interdum arcu condimentum. Etiam risus nunc, blandit eu elit vitae, pharetra scelerisque neque. Curabitur tempor eu lectus eget aliquet. Ut turpis tellus, dictum vitae vehicula at, placerat non ante.</p>
                <p>Nulla quis lacinia ligula. In vel tempor risus. Aliquam dapibus facilisis nibh, eu molestie libero auctor a. Aliquam molestie a arcu a pretium. Pellentesque accumsan pharetra sagittis. Donec facilisis maximus velit vestibulum convallis. Curabitur faucibus tempor viverra. Cras pretium purus non justo ultrices mattis. Vivamus ullamcorper vel nunc sed cursus. Integer vel sapien ullamcorper, lobortis enim eget, consequat velit. Etiam pellentesque tristique nisi, quis auctor velit condimentum sit amet. Nullam ante sapien, blandit eget bibendum in, sollicitudin ac arcu. Sed tortor nulla, laoreet vitae placerat sit amet, molestie vel nisi.</p>
                <p>Quisque erat turpis, fringilla tincidunt tortor vel, venenatis tincidunt mi. Phasellus non pellentesque felis. Vivamus interdum enim diam, ac elementum ipsum vulputate ac. Mauris venenatis libero volutpat egestas sodales. Aenean ac enim ut tellus pharetra pharetra. Praesent ut ligula elit. Duis ultricies, eros ac aliquam pulvinar, enim orci vulputate diam, quis lobortis erat mi eget diam. Cras sollicitudin massa vitae vulputate rutrum. Nullam malesuada quis justo vel feugiat. Ut quis convallis tortor, pharetra tincidunt elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eleifend nec felis non volutpat.</p>
                <p>Etiam mattis diam felis, eget tempor risus auctor eget. Integer finibus finibus venenatis. Quisque rhoncus id ipsum id finibus. In vel sapien placerat tellus euismod porta vestibulum eget tellus. Vivamus vitae mollis turpis, quis rutrum lectus. Cras dignissim egestas mollis. Vestibulum sed justo sollicitudin eros faucibus pharetra non et quam. Cras sed rutrum erat. Curabitur interdum sollicitudin purus, vitae posuere purus sollicitudin et. Proin quis justo nibh. Nam mattis nisl ac felis dapibus iaculis. Aenean tristique lacus mattis mollis semper.</p>
                <p>Morbi egestas finibus leo eget sagittis. Nunc vitae vehicula metus. Donec suscipit sem eget sem tristique porttitor eget non sapien. Cras eleifend id mi eget sagittis. Nulla sodales tortor ut urna semper porta. Morbi id eleifend lectus, ac ultricies orci. Proin risus massa, hendrerit vel leo ac, scelerisque semper diam. Proin sit amet urna nec enim molestie ultricies ut eu orci. Nulla sagittis lacus turpis, a molestie neque semper vitae. Aliquam dapibus ultrices lectus, eu vulputate ante dignissim eu. Nulla sit amet urna felis. Fusce pharetra urna vel augue sollicitudin facilisis. Praesent eu egestas enim. Fusce vitae auctor purus. Duis posuere enim sed orci finibus molestie.</p>
                <p>Aliquam scelerisque molestie nisi nec iaculis. Suspendisse potenti. Nullam sit amet dui mi. Etiam blandit sapien in lacus porta finibus. Aenean ornare augue vel arcu ultricies condimentum. Suspendisse id urna turpis. Sed eget dictum leo.</p>
                <p>Donec pellentesque nibh sit amet nunc blandit, ut pellentesque elit vehicula. Sed vitae mi ut eros bibendum lobortis. Vivamus nisl odio, blandit a pharetra et, consectetur congue mi. Nam in dignissim ipsum. Etiam ultricies velit mauris, vitae accumsan risus semper vel. Suspendisse tristique ut odio nec egestas. Donec nec tincidunt diam. In vitae nisl non nunc maximus placerat. Phasellus sagittis et felis quis rutrum. Ut viverra tortor vel lorem egestas, non vehicula justo volutpat. Cras sem mi, mattis et ligula pulvinar, facilisis auctor tellus. Aenean bibendum venenatis urna, nec blandit leo molestie nec. Etiam condimentum nisi consequat, scelerisque quam at, laoreet erat. Donec tempus fermentum condimentum. Cras sit amet risus metus.</p>
                <p>Nullam id magna mauris. Suspendisse luctus ante a nunc lacinia scelerisque. Suspendisse nec elementum quam. Vestibulum fermentum placerat tempor. Praesent elementum consectetur porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac purus augue. Ut tristique euismod felis, vel tincidunt enim porttitor sit amet. Nullam porta commodo augue et ornare. Nullam fringilla, ligula scelerisque fermentum aliquam, arcu dolor volutpat leo, sit amet congue est est eget metus. Sed vestibulum suscipit orci nec pulvinar. Phasellus ex felis, mattis eget dapibus eget, egestas non turpis. Phasellus et ornare lectus. In a mi non tellus dictum facilisis.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus diam posuere, consectetur augue eget, aliquet justo. Suspendisse a lacus sollicitudin, blandit nibh in, mollis nisl. Nulla facilisi. In consequat sem id erat hendrerit euismod. Fusce vel pulvinar nisi. Vestibulum auctor quam lorem, cursus bibendum magna pulvinar ut.</p>
                <p>Pellentesque massa neque, interdum id pretium in, tristique eget eros. Praesent justo massa, suscipit sit amet sem non, pulvinar eleifend ante. Donec nibh magna, luctus vel tristique at, molestie nec massa. Nunc scelerisque porta enim vel feugiat. Nullam convallis ultrices nibh sit amet faucibus. Nulla rutrum, purus ac sagittis egestas, lacus tellus pharetra tellus, sit amet sodales dolor felis ut arcu. Aenean nec massa sed augue pellentesque finibus egestas a nunc. Proin feugiat, metus non congue sollicitudin, risus arcu venenatis sapien, in ullamcorper sapien ligula nec ligula. Quisque iaculis nulla cursus massa vestibulum, viverra vestibulum purus elementum. Phasellus id velit mattis, scelerisque leo non, ornare mauris. Vivamus molestie justo et libero fermentum, id fermentum metus laoreet.</p>
                <p>Curabitur volutpat cursus orci, vitae ultricies diam interdum id. Pellentesque nec volutpat magna. Proin sed tortor sit amet magna venenatis posuere quis suscipit nisl. Cras auctor elit sit amet eros bibendum lobortis. Nulla vitae vehicula magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean aliquet, risus eget lobortis luctus, metus erat euismod justo, a bibendum odio mi semper nisl.</p>
                <p>Nullam venenatis, velit eget vestibulum eleifend, orci justo rhoncus urna, vitae convallis ante sem vel massa. Nunc efficitur tincidunt sagittis. Sed et sapien quis diam tempor suscipit. Duis eget elementum nulla. Donec in sem neque. Praesent id nulla diam. Suspendisse facilisis dignissim augue, aliquam scelerisque dui euismod ultrices. Praesent sed ligula sit amet massa egestas auctor a id nibh. Curabitur placerat pulvinar purus nec vulputate. Nulla vel odio eros. Integer odio lacus, mollis et mollis sed, congue ac mi. Sed eget viverra arcu.</p>
                <p>Nullam vestibulum, est in tempus vulputate, justo leo luctus mi, nec tempus leo diam non ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce convallis volutpat velit, a interdum nulla. Maecenas lobortis velit egestas felis bibendum vulputate. Morbi consectetur condimentum lacus. Ut mauris tellus, volutpat eu euismod nec, fermentum et ante. Suspendisse vel dui hendrerit sem lobortis varius.</p>
                <p>Donec rutrum, magna ac pellentesque viverra, enim nunc feugiat ante, eget mattis ipsum diam a sem. Etiam consectetur est ligula, eget efficitur odio rhoncus ac. Donec ultricies laoreet arcu et malesuada. In maximus dui eu neque convallis, id tincidunt elit volutpat. Duis eros ex, consectetur in neque ut, auctor porttitor neque. Maecenas accumsan, massa at porta bibendum, nulla lectus suscipit enim, sit amet accumsan quam sapien vitae nibh. Ut sed felis urna. Integer lobortis nisi neque, sed maximus odio vulputate eu. Suspendisse at porttitor tellus, eu laoreet metus. In diam dolor, commodo ac metus vel, congue porta nisi. Nunc venenatis enim vel elit vehicula dignissim.</p>
                </div>

                <button className={TermsCss['back-button']} onClick = {registerRedirect} > Back to Registration </button>
            <Footer/>
            </div>
        </div>
        );
};

export default Terms;