import { motion } from "framer-motion"
import ApplyCertiDocCSS from '../../css/ApplyCertiDoc.module.css';
import CommonCSS from "../../css/common/Common.module.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { callRegistCertiDoc } from "../../apis/CertiDocAPICalls";

/* 모든 교직원의 '증명서 발급 신청' */

function ApplyCertiDoc () {

    const [form1, setForm] = useState({
        certiFormCode : 300001
    });
    const [form2, setForm2] = useState({
        certiFormCode : 300002
    })

    const [form3, setForm3] = useState({
        certiFormCode : 300003
    })
    const dispatch = useDispatch();
    const {regist} = useSelector(state => state.CertiReducer);

    const onChangeHandler = (e, certiDoc) => {
        switch(certiDoc){
            case "재직증명서" : return setForm({
                ...form1,
                [e.target.name]: e.target.value,
              })
            case "경력증명서" : return setForm2({
                ...form2,
                [e.target.name]: e.target.value,
              })
            case "강의경력증명서" : return setForm3({
                ...form3,
                [e.target.name]: e.target.value,
              })
            }
        }
        
    useEffect(
        ()=>{
            if(regist?.status === 200){
                toast.success("증명서 신청이 완료되었습니다.");
            }
        },
        [regist]
    )

    const onClickHandler = ({DocType}) => {        

        if(DocType == "재직"){
            if(form1.certiUse == undefined || form1.certiUse == "용도 선택"){
                toast.error("양식을 제대로 입력해주세요")
                return;
            } else if(form1.reason == undefined || null ){
                toast.error("양식을 제대로 입력해주세요")
                return;
            }
        const formData = new FormData();
        formData.append("certiForm.certiFormCode", form1.certiFormCode);
        formData.append("certiUse", form1.certiUse);
        formData.append("reason",form1.reason);

        dispatch(callRegistCertiDoc(formData));
        }
        if(DocType == "경력"){
            if(form2.certiUse == undefined || form2.certiUse == "용도 선택"){
                toast.error("양식을 제대로 입력해주세요")
                return;
            } else if(form2.reason == undefined || null ){
                toast.error("양식을 제대로 입력해주세요")
                return;
            }
            const formData = new FormData();
            formData.append("certiForm.certiFormCode", form2.certiFormCode);
            formData.append("certiUse", form2.certiUse);
            formData.append("reason",form2.reason);
    
            dispatch(callRegistCertiDoc(formData));
        }
        if(DocType == "경력증명"){
            if(form3.certiUse == undefined || form3.certiUse == "용도 선택"){
                toast.error("양식을 제대로 입력해주세요")
                return;
            } else if(form3.reason == undefined || null ){
                toast.error("양식을 제대로 입력해주세요")
                return;
            }
            const formData = new FormData();
            formData.append("certiForm.certiFormCode", form3.certiFormCode);
            formData.append("certiUse", form3.certiUse);
            formData.append("reason",form3.reason);
    
            dispatch(callRegistCertiDoc(formData));
        }

    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeOut", duration: 0.5 }}
        >
            <div>
                <p className={ CommonCSS.pageDirection }>증명서 ▸ 증명서 발급 신청</p>
            </div>

            <div className={ApplyCertiDocCSS.ApplyTitle}>
              <p>뭘 좀 넣고 싶은디?</p>
            </div>
            <div className={ApplyCertiDocCSS.ApplyCertiDocCSS}>
                <table className={ApplyCertiDocCSS.ApplyTable}>
                    <colgroup>
                    <col width="20%"/>
                    <col width="20%"/>
                    <col width="20%"/>
                    <col width="70%"/>
                    <col width="20%"/>
                    <col width="20%"/>                    
                    </colgroup>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>종류</th>
                            <th>용도</th>
                            <th>사유</th>
                            <th>발급 소요일</th>
                            <th></th> <br/>
                            <br></br>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={ApplyCertiDocCSS.NumberingOne}><span>1</span></td>
                            <td>재직증명서</td>
                            <td><select onChange={(e)=> onChangeHandler(e,"재직증명서")} name="certiUse">
                                <option value="용도 선택">용도 선택</option> 
                                <option value="금융기관제출용">금융기관제출용</option>
                                <option value="관공서제출용">관공서제출용</option>
                                <option value="회사제출용">회사제출용</option>
                                </select></td>
                            <td><input type="text" name="reason" onChange={(e) => onChangeHandler(e,"재직증명서")}/></td>
                            <td>1시간 내외</td>
                            <button onClick={()=>onClickHandler({DocType : "재직"})}>신청</button>                            
                        </tr>
                        <tr>
                            <td className={ApplyCertiDocCSS.NumberingOne}><span>2</span></td>
                            <td>경력증명서</td>
                            <td><select onChange={(e)=> onChangeHandler(e,"경력증명서")} name="certiUse">
                                <option value="용도 선택">용도 선택</option> 
                                <option value="금융기관제출용">금융기관제출용</option>
                                <option value="관공서제출용">관공서제출용</option>
                                <option value="회사제출용">회사제출용</option>
                                </select></td>
                            <td><input type="text" name="reason" onChange={(e)=> onChangeHandler(e,"경력증명서")}/></td>
                            <td>1시간 내외</td>
                            <button onClick={()=>onClickHandler({DocType : "경력"})}>신청</button>                            
                        </tr>
                        <tr>
                            <td className={ApplyCertiDocCSS.NumberingOne}><span>3</span></td>
                            <td>강의경력증명서</td>
                            <td><select onChange={(e)=> onChangeHandler(e,"강의경력증명서")}  name="certiUse">
                                <option value="용도 선택">용도 선택</option> 
                                <option value="금융기관제출용">금융기관제출용</option>
                                <option value="관공서제출용">관공서제출용</option>
                                <option value="회사제출용">회사제출용</option>
                                </select> </td>
                            <td><input type="text" name="reason" onChange={(e)=> onChangeHandler(e,"강의경력증명서")}/></td>
                            <td>1시간 내외</td>
                            <button onClick={()=>onClickHandler({DocType : "경력증명"})}>신청</button>                            
                        </tr>
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}

export default ApplyCertiDoc;