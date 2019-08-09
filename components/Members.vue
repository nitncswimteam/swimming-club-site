<template lang="pug">
.members
  table.members_number
    tbody
      tr.members_number_tr
        td 部員数（現役）
        td {{members.number.all}} 名
      tr(v-if="!(members.number.male==0 || members.number.female==0)").members_number_tr
        td 男子選手
        td {{members.number.male}} 名
      tr(v-if="!(members.number.male==0 || members.number.female==0)").members_number_tr
        td 女子選手
        td {{members.number.female}} 名
      tr(v-if="!(members.number.othergender==0 || members.number.male==0 || members.number.female==0)").members_number_tr
        td その他の選手
        td {{members.number.othergender}} 名
      tr(v-if="members.number.manager!==0").members_number_tr
        td マネージャー(MG)
        td {{members.number.manager}} 名
      tr(v-if="members.number.teacher!==0").members_number_tr
        td 顧問教員
        td {{members.number.teacher}} 名
  
  table.members_list
    tbody
      tr(v-for="(exeMem,exeMem_id) in executiveMember" :key="`exeMem_${exeMem_id}`").members_list_executive
        td {{exeMem.position}}
        td {{exeMem.grade}}
        td {{exeMem.department}}
        td {{exeMem.name}}
      tr: td(v-for="i in 4") <br>
      tr(v-for="(otherMem,otherMem_id) in otherMember" :key="`otherMem_${otherMem_id}`").members_list_other
        td {{otherMem.position}}
        td {{otherMem.grade}}
        td {{otherMem.department}}
        td {{otherMem.name}}
</template>

<script>
export default {
  props:["members"],
  data(){
    return{
      exeMember:[]
    }
  },
  computed:{
    executiveMember(){
      let executive_member = []
      executive_member.push( ...this.members.list.filter(x => {
        if(x.position){
          return (x.position.indexOf('部長') != -1) && (x.position.indexOf('副部長') == -1) 
        }
      }))
      executive_member.push( ...this.members.list.filter(x => {
        if(x.position){
          return (x.position.indexOf('副部長') != -1)
        }
      }))
      executive_member.push( ...this.members.list.filter(x => {
        if(x.position){
          return (x.position.indexOf('会計') != -1)
        }
      }))
      executive_member.push( ...this.members.list.filter(x => {
        if(x.position){
          return (x.position.indexOf('MG') != -1) || (x.position.indexOf('マネージャー') != -1)
        }
      }))
      let finExeMem = executive_member.filter((x1, i1, self) => {//重複を削除
        return (self.findIndex(x2 => { 
          return (x1.name===x2.name && x1.department===x2.department && x1.grade===x2.grade && x1.position===x2.position)
        }) === i1);
      })
      this.exeMember = finExeMem;
      return finExeMem
    },
    otherMember(){
      let mem = [...this.members.list]
      let exeMem = [...this.exeMember]
      for (let i = 0; i < exeMem.length; i++) {
        mem.some((x,mi) => {
          if(x.name == exeMem[i].name){ mem.splice(mi,1) }
        })
      }
      return mem
    }
  },
}
</script>


<style lang="scss" scoped>

</style>
