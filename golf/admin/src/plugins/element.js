
import{
    Button,
    Input,
    Form,
    FormItem,
    Loading,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    PageHeader,
    Table,
    TableColumn,
    Pagination,
    Select,
    Option,
    DatePicker,
    Dialog,
    Radio,
    TimePicker,
    Tabs,
    TabPane,
    Upload,
    Image,
    RadioGroup,
    Card,
    Popconfirm,
    Switch,
    Popover,
    Checkbox,
    CheckboxGroup,

} from 'element-ui';


const element ={
    install:function(Vue){
        Vue.use(Button);
        Vue.use(Input);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Loading);
        Vue.use(Dropdown);
        Vue.use(DropdownMenu);
        Vue.use(DropdownItem);
        Vue.use(Menu);
        Vue.use(Submenu);
        Vue.use(MenuItem);
        Vue.use(MenuItemGroup);
        Vue.use(PageHeader);
        Vue.use(Table);
        Vue.use(TableColumn);
        Vue.use(Pagination);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(DatePicker);
        Vue.use(Dialog);
        Vue.use(Radio);
        Vue.use(TimePicker);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Upload);
        Vue.use(Image);
        Vue.use(RadioGroup);
        Vue.use(Card);
        Vue.use(Popconfirm);
        Vue.use(Switch);
        Vue.use(Popover);
        Vue.use(Checkbox);
        Vue.use(CheckboxGroup);
    }
}


export default element
