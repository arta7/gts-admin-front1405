import { SideBarItemType } from '../components/sideBar/SideBarItem'
import DynamicComponent from '../components/DynamicComponent'
import UserList, { loader as userListLoader } from '../pages/User/UserList'
import WorkGroupList, {
  loader as workGroupListLoader,
} from '../pages/WorkGroup/WorkGroupList'




import DefinitionList, {
  loader as definitionListLoader,
} from '../pages/definition/DefinitionList'
import { Outlet } from 'react-router-dom'
import FormDynamicComponent from '../components/FormDynamicComponent'
import { DashboardHome } from '../pages'
import baseUrl from '../utils/Util'
import SejamConfirmation from '../pages/sejamConfirmation/SejamConfirmation'
import SejamAccountRegistration from '../pages/sejamAccountRegistration/SejamAccountRegistration'
import { SejamAccountOpening } from '../pages/sejamAccountOpening/SejamAccountOpening'
import MyProfile from '../pages/myProfile/MyProfile'






import LoginConfig from '../pages/auth/LoginConfig'
import StatisticsReport from '../pages/reports/Reports'
import ReportGrid from '../components/reportGrid/ReportGrid'
import MyActivities from '../pages/myActivities/MyActivities'
import HumanCapitalDashboard from '../pages/DashboardHome/HumanCapitalDashboard/HumanCapitalDashboard'
import SignUp from '../components/auth/SignUp'



export const dynamicRoutes = (result: any) => {
  result = result?.sort((a: any, b: any) => a.system.sortOrder > b.system.sortOrder ? 1 : -1);
  openDefaultSystem();
  console.log('load data ',result)

  return result?.map((item: any) => {
    const system = item.system
    let _item: SideBarItemType = {
      title: system.caption,
      icon: system.icon,
    }
    if (system.routPath == "Counter") {
      _item.index = true
      _item.element = <DashboardHome />
      _item.fullPath = `${baseUrl}/`
    } else {
      _item.path = system.routPath
      _item.fullPath = `${baseUrl}/${system.routPath}`
    }
    if (!system.subSystems || system.subSystems?.length == 0) {
      item.element = <DynamicComponent info={system} />
    } else {
      _item.children = system.subSystems?.map((subItem: any) => {
        let _subItem: SideBarItemType = {
          title: subItem.caption,
          path: subItem.routPath,
          fullPath: `${_item.fullPath}/${subItem.routPath}`,
        }
        if (!subItem.children || subItem.children?.length == 0) {
          if (subItem.routPath == "Activities") {
            _subItem.element = <Outlet />
            _subItem.children = [
              {
                index: true,
                element: <MyActivities />,
                hideOnSidebar: true,
              }
            ]
          }
          else if (subItem.routPath == "HumanCapitalDashboard") {
            _subItem.element = <Outlet />
            _subItem.children = [
              {
                index: true,
                element: <HumanCapitalDashboard />,
                hideOnSidebar: true,
              }
            ]
          }
          else {
            _subItem.element = <Outlet />
            _subItem.children = [
              {
                index: true,
                element: <DynamicComponent info={subItem} />,
                hideOnSidebar: true,
              },
              {
                path: ':id',
                element: <FormDynamicComponent info={subItem} />,
                hideOnSidebar: true,
              },
            ]
          }
        } else {
          _subItem.children = subItem.children?.map((leaf: any) => {
            
            let leafItem: any = {
              title: leaf.caption,
              path: `${leaf.routPath}`,
              fullPath: `${_subItem.fullPath}/${leaf.routPath}`,
              element: <Outlet />,
            }
            console.log('leaf.routPath',leaf.routPath)
            if (leaf.routPath == 'Workgroups') {
              leafItem.element = <WorkGroupList />
              leafItem.loader = workGroupListLoader
            } else if (leaf.routPath == 'Users') {
              leafItem.element = <UserList />
              leafItem.loader = userListLoader
            }
            else if (leaf.routPath == 'MyProfile') {
              leafItem.element = <MyProfile />
            }
          

           
          
            


            else if (leaf.routPath == 'BaseDefinitions') {
              leafItem.element = <DefinitionList />
              leafItem.loader = definitionListLoader
            } else if (leaf.routPath == 'SEJAMConfirmation') {
              leafItem.element = <SejamConfirmation />
            }
            else if (leaf.routPath == "AccountRegistration") {
              leafItem.element = <SejamAccountRegistration />
            }
            else if (leaf.routPath == "AccountOpening") {
              leafItem.element = <SejamAccountOpening />
            }
            else if (leaf.routPath == "LoginSetting") {
              leafItem.element = <LoginConfig />
            }
            else if (leaf.targetPageType == "SpecificReport") {
              leafItem.element = <ReportGrid info={leaf} key={leaf.id} systemId={system.id} />
            }
            else if (leaf.routPath == 'StatisticsReport') {
              leafItem.element = <StatisticsReport systemId={system.id} title={leaf.caption} />
            }
            else if (leaf.routPath == "SignUp") {
              leafItem.element = <SignUp />
            }
            else {
              leafItem.children = [
                {
                  index: true,
                  element: <DynamicComponent info={leaf} />,
                  hideOnSidebar: true,
                },
                {
                  path: ':id',
                  element: <FormDynamicComponent info={leaf} />,
                  hideOnSidebar: true,
                },
              ]
            }
            return leafItem
          })
        }
        return _subItem
      })
    }
    return _item
  }
  
)

  function openDefaultSystem() {
    const systems = result?.filter((s: { system: { code: string } }) => s.system.code.indexOf("S") == 0)
    if (systems?.length == 1) {
      window.history.pushState(null, '', `${baseUrl}/${systems[0].system.routPath}`)
    }
  }
}
