// const boardService = require('../services/boardService');
// const activityService = require('../services/activityService');
// const projectService = require('../services/projectService');
// const subtaskService = require('../services/subtaskService');
// const taskService = require('../services/taskService');
// const userService = require('../services/userService');
// const authService = require('../services/authService');
// const notificationService = require('../services/notificationService');
// const fileService = require('../services/fileService');
// const commentService = require('../services/commentService');
// const tagService = require('../services/tagService');
// const labelService = require('../services/labelService');
// const integrationService = require('../services/integrationService');
// const settingService = require('../services/settingService');
// const emailService = require('../services/emailService');
// const webhookService = require('../services/webhookService');
// const dashboardService = require('../services/dashboardService');
// const reportService = require('../services/reportService');
// const searchService = require('../services/searchService');
// const automationService = require('../services/automationService');
// const permissionService = require('../services/permissionService');
// const subscriptionService = require('../services/subscriptionService');
// const analyticsService = require('../services/analyticsService');
// const auditLogService = require('../services/auditLogService');
// const customFieldService = require('../services/customFieldService');
// const timeTrackingService = require('../services/timeTrackingService');
// const roleService = require('../services/roleService');
// const milestoneService = require('../services/milestoneService');
// const dependencyService = require('../services/dependencyService');
// const workspaceService = require('../services/workspaceService');
// const teamService = require('../services/teamService');
// const issueService = require('../services/issueService');
// const sprintService = require('../services/sprintService');
// const kanbanService = require('../services/kanbanService');
// const goalService = require('../services/goalService');
// const feedbackService = require('../services/feedbackService');
// const riskService = require('../services/riskService');
// const knowledgeBaseService = require('../services/knowledgeBaseService');
// const templateService = require('../services/templateService');
// const customActionService = require('../services/customActionService');
// const customViewService = require('../services/customViewService');
// const customReportService = require('../services/customReportService');
// const customWorkflowService = require('../services/customWorkflowService');
// const customIntegrationService = require('../services/customIntegrationService');
// const customDashboardService = require('../services/customDashboardService');
// const customNotificationService = require('../services/customNotificationService');
// const customPermissionService = require('../services/customPermissionService');
// const customRoleService = require('../services/customRoleService');
// const customSettingService = require('../services/customSettingService');
// const customSubscriptionService = require('../services/customSubscriptionService');
// const customAnalyticsService = require('../services/customAnalyticsService');
// const customAuditLogService = require('../services/customAuditLogService');
// const customCustomFieldService = require('../services/customCustomFieldService');
// const customTimeTrackingService = require('../services/customTimeTrackingService');
// const customMilestoneService = require('../services/customMilestoneService');
// const customDependencyService = require('../services/customDependencyService');
// const customWorkspaceService = require('../services/customWorkspaceService');
// const customTeamService = require('../services/customTeamService');
// const customIssueService = require('../services/customIssueService');
// const customSprintService = require('../services/customSprintService');
// const customKanbanService = require('../services/customKanbanService');

const userService = require('../services/userService');
const projectService = require('../services/projectService');
const boardService = require('../services/boardService');
const taskService = require('../services/taskService');
const subtaskService = require('../services/subtaskService');
const commentService = require('../services/commentService');
const notificationService = require('../services/notificationService');
const activityService = require('../services/activityService');
const jwt = require('jsonwebtoken');

module.exports = {
  // Query
  getUsers: async () => await userService.getAllUsers?.(),

  getProjects: async () => await projectService.getProjects(),
  getProject: async ({ id }) => await projectService.getProjectById(id),

  getBoardsByProject: async ({ projectId }) => await boardService.getBoardsByProject(projectId),
  getBoard: async ({ id }) => await boardService.getBoardById(id),

  getTask: async ({ id }) => await taskService.getTaskById(id),
  getTasksByProject: async ({ projectId }) => await taskService.getTasksByProject(projectId),

  getSubtasksByTask: async ({ taskId }) => await subtaskService.getSubtasksByTask(taskId),

  getCommentsByTask: async ({ taskId }) => await commentService.getCommentsByTask(taskId),

  getNotificationsByUser: async ({ userId }, context) => {
    const uid = userId || context.req.user?._id;
    return await notificationService.getNotificationsByUser(uid);
  },

  getActivitiesByProject: async ({ projectId }) => await activityService.getActivitiesByProject(projectId),

  // Mutation
  registerUser: async ({ input }) => await userService.createUser(input),

  login: async ({ input }) => {
    const user = await userService.findUserByEmail(input.email);
    if (!user) throw new Error("User not found");

    const valid = await userService.comparePasswords(input.password, user.password);
    if (!valid) throw new Error("Incorrect password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return { token, user };
  },

  addProject: async ({ input }) => await projectService.createProject(input),

  addBoard: async ({ input }) => await boardService.createBoard(input),
  updateBoard: async ({ id, input }) => await boardService.updateBoard(id, input),
  deleteBoard: async ({ id }) => {
    await boardService.deleteBoard(id);
    return "Board deleted";
  },

  addTask: async ({ input }) => await taskService.createTask(input),

  addSubtask: async ({ input }) => await subtaskService.createSubtask(input),

  addComment: async ({ input }, context) => {
    const authorId = context.req.user._id;
    return await commentService.addComment(input, authorId);
  },

  addNotification: async ({ input }) => await notificationService.addNotification(input),
  markNotificationAsRead: async ({ id }) => await notificationService.markNotificationAsRead(id),

  addActivity: async ({ input }) => await activityService.addActivity(input),
};


