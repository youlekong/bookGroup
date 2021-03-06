<template>
    <section>
        <el-main>
            <table-filter @addRecord="handleAdd" layout="exact, input, search, datetime"
                          @filter="filter" :exactTypes="exactTypes"></table-filter>

            <el-table :data="list" stripe style="width: 100%">
                <el-table-column prop="id" label="id" width="50" fixed></el-table-column>
                <el-table-column prop="user.name" label="借书人" width="150"></el-table-column>
                <el-table-column prop="from_user.name" label="被借书人" width="150"></el-table-column>
                <el-table-column prop="book.name" label="书名" width="150"></el-table-column>
                <el-table-column prop="mark" label="备注" width="150"></el-table-column>
                <el-table-column prop="start_time" label="开始时间" width="150"></el-table-column>
                <el-table-column prop="end_time" label="结束时间" width="150"></el-table-column>
                <el-table-column label="操作" width="180" fixed="right">
                    <template slot-scope="scope">
                        <!--<el-button size="mini"-->
                                   <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <el-button size="mini" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <pagination :pagination="pagination" @nextPage="nextPage"></pagination>
        </el-main>

        <el-dialog :title="type?'编辑':'新增'" :visible.sync="showDialog">
            <el-form :model="form" label-width="80px">
                <el-form-item label="活动名" prop="name">
                    <el-input v-model.trim="form.name" placeholder="请输入活动名"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间" prop="dateTime">
                    <el-date-picker
                            v-model="dateTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            value-format="yyyy-MM-dd"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="组织者" prop="author">
                    <el-input v-model.trim="form.author" placeholder="请输入组织者"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动描述" prop="desc">
                    <el-input v-model.trim="form.desc" placeholder="请输入描述"
                              auto-complete="off" type="textarea" rows="5"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="确认删除" :visible.sync="showDelete" width="30%">
            <span>确认删除？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDelete = false">取消</el-button>
                <el-button type="primary" @click="delRecord">确定</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>
    import pagination from '../components/pagination.vue';
    import tableFilter from '../components/tableFilter.vue';
    import { apiGetRentals, apiCreateRental, apiUpdateRental,
        apiDeleteRental } from '../api/backend.js';
    import { validValue } from '../tools/lite-validator.js'
    import { ylTrim } from '../tools/common.js'

    export default {
        data() {
            return {
                list: [],
                form: {
                    'name': '',
                    'desc': '',
                    'author': '',
                    'c_id': 0,
                },
                dateTime: '',
                pagination: {
                    total: 0,
                    curPage: 1,
                },
                showDialog: false,
                showDelete: false,
                type: 0,        // 0:新增 1:编辑
                uid: 0,
                exactTypes: [
                    {type: 'id', name: 'id'},
                    {type: 'u_name', name: '借书人'},
                    {type: 'b_name', name: '书名'},
                    {type: 'from_name', name: '被借书人'},
                    {type: 'mark', name: '备注'}
                ]
            }
        },
        watch: {
            dateTime(val) {
                if (val instanceof Array) {
                    this.form.start_time = val[0];
                    this.form.end_time = val[1];
                }
            }
        },
        methods: {
            getlist(keyword) {
                let params = {page: this.pagination.curPage };
                if (keyword)
                    params = Object.assign(params, keyword);

                let self = this;
                apiGetRentals(params).then(res => {
                    if (res.code === 1) {
                        self.list = res.msg.data;
                        self.pagination.total = res.msg.total;
                        self.pagination.curPage = res.msg.current_page;
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            nextPage(page) {
                this.pagination.curPage = page;
                this.getlist();
            },
            filter(keyword) {
                this.getlist(keyword);
            },
            handleAdd() {
                this.form = {
                    'name': '',
                    'desc': '',
                    'author': '',
                    'start_time': '',
                    'end_time': ''
                };
                this.type = 0;
                this.showDialog = true;

                this.dateTime = [];
            },
            handleEdit(index, row) {
                this.form = Object.assign({}, row);
                this.type = 1;
                this.showDialog = true;

                this.dateTime = [this.form.start_time, this.form.end_time];
            },
            handleDelete(index, row) {
                this.uid = row.id;
                this.showDelete = true;
            },
            delRecord() {
                let self = this;
                apiDeleteRental({id: this.uid}).then( res => {
                    if (res.code === 1) {
                        self.$message.success(res.msg);
                        self.getlist();
                        self.showDelete = false;
                    } else {
                        self.$message.error(res.msg);
                    }
                }).catch( err => { console.log(err); });
            },
            submitForm() {
                if ( !this._validateForm() )
                    return ;

                let self = this;
                if (this.type === 0) {
                    apiCreateRental(this.form).then(res => {
                        if (res.code === 1) {
                            self.$message.success(res.msg);
                            self.getlist();
                            self.showDialog = false;
                        } else {
                            self.$message.error(res.msg);
                        }
                    }).catch(err => { console.log(err); })
                } else if (this.type === 1) {
                    delete this.form.cate;
                    delete this.form.user;
                    apiUpdateRental(this.form).then(res => {
                        if (res.code === 1) {
                            self.$message.success(res.msg);
                            self.getlist();
                            self.showDialog = false;
                        } else {
                            self.$message.error(res.msg);
                        }
                    }).catch( err => { console.log(err); })
                }
            },
            _validateForm() {

                // 书名
                if (ylTrim(this.form.name).length <= 0) {
                    this.$message.error('活动名不能为空！');
                    return false
                }
                if (!validValue.allName(this.form.name) ) {
                    this.$message.error('请输入活动，且长度为2到15！');
                    return false
                }

                // 作者
                if (ylTrim(this.form.author).length <= 0) {
                    this.$message.error('组织者不能为空！');
                    return false
                }
                if (!validValue.allName(this.form.author) ) {
                    this.$message.error('组织者请输入中文名称或英文！');
                    return false
                }

                // 描述
                if (ylTrim(this.form.desc).length <= 0) {
                    this.$message.error('活动描述不能为空！');
                    return false
                }

                return true;
            }
        },
        components: {
            'pagination': pagination,
            'tableFilter': tableFilter,
        },
        created() {
            this.getlist();
        }
    }
</script>