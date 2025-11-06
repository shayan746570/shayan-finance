import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function App(){
  const [income, setIncome] = useState(0)
  const [history, setHistory] = useState([])
  useEffect(()=>{
    const h = localStorage.getItem('shayan_history')
    if(h) setHistory(JSON.parse(h))
  },[])
  const calc = p => ({
    invest: p*0.6, living: p*0.2, fun: p*0.15, charity: p*0.05,
    gold: p*0.6*0.2, forex: p*0.6*0.15, funds: p*0.6*0.25, skill: p*0.6*0.2, reserve: p*0.6*0.2
  })
  const result = calc(Number(income)||0)
  function saveMonth(){
    const item = { date: new Date().toLocaleDateString('fa-IR'), income: Number(income) }
    const updated = [...history, item]
    setHistory(updated); localStorage.setItem('shayan_history', JSON.stringify(updated))
  }
  return (
    <div style={{maxWidth:900, margin:'16px auto', padding:12, direction:'rtl', fontFamily:'Vazir, sans-serif', background:'#0b0b0f', color:'#f5f5f5', minHeight:'100vh'}}>
      <h1 style={{textAlign:'center', color:'#ffd700'}}>سیستم مالی حرفه‌ای Shayan-Finance</h1>
      <div style={{display:'grid', gridTemplateColumns:'1fr', gap:10}}>
        <div style={{padding:12, borderRadius:8, background:'#0f1724'}}>
          <label>درآمد ماهانه (تومان)</label>
          <input type='number' value={income} onChange={e=>setIncome(e.target.value)} style={{width:'100%', padding:8, marginTop:8, borderRadius:6, border:'1px solid #222', background:'#020617', color:'#fff'}} />
          <button onClick={saveMonth} style={{marginTop:8, padding:10, width:'100%', background:'#ffd700', borderRadius:8}}>ثبت ماه</button>
        </div>
        <div style={{padding:12, borderRadius:8, background:'#071028', display:'flex', gap:12, flexWrap:'wrap'}}>
          <div>سرمایه‌گذاری: {result.invest.toLocaleString()} تومان</div>
          <div>هزینه زندگی: {result.living.toLocaleString()} تومان</div>
          <div>تفریح: {result.fun.toLocaleString()} تومان</div>
          <div>نیکوکاری: {result.charity.toLocaleString()} تومان</div>
        </div>
        <div style={{padding:12, borderRadius:8, background:'#071028'}}>
          <h3 style={{color:'#ffd700'}}>جزئیات سرمایه‌گذاری</h3>
          <div>طلا: {result.gold.toLocaleString()}</div>
          <div>ارز: {result.forex.toLocaleString()}</div>
          <div>صندوق: {result.funds.toLocaleString()}</div>
          <div>مهارت: {result.skill.toLocaleString()}</div>
          <div>پول فرصت: {result.reserve.toLocaleString()}</div>
        </div>
        <div style={{padding:12, borderRadius:8, background:'#071028'}}>
          <h3 style={{color:'#ffd700'}}>نمودار درآمد ثبت شده</h3>
          <div style={{width:'100%', height:220}}>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={history}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' stroke='#9ca3af' />
                <YAxis stroke='#9ca3af' />
                <Tooltip />
                <Line type='monotone' dataKey='income' stroke='#ffd700' strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
