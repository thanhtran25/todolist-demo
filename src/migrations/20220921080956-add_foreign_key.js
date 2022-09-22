'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Projects', {
      fields: ['leader_id'],
      type: 'foreign key',
      name: 'fkey_constraint_project_leader',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('Users', {
      fields: ['project_id'],
      type: 'foreign key',
      name: 'fkey_constraint_user_project',
      references: {
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    await queryInterface.addConstraint('Tasks', {
      fields: ['project_id'],
      type: 'foreign key',
      name: 'fkey_constraint_task_project',
      references: {
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('UserTasks', {
      fields: ['task_id'],
      type: 'foreign key',
      name: 'fkey_constraint_usertasks_task',
      references: {
        table: 'Tasks',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addConstraint('UserTasks', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'fkey_constraint_usertasks_project',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
    await queryInterface.addIndex('UserTasks', ['user_id', 'task_id'], {
      unique: true,
      name: 'idex_unique_user_tasks'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Projects', 'fkey_constraint_project_leader');
    await queryInterface.removeConstraint('Users', 'fkey_constraint_user_project');
    await queryInterface.removeConstraint('Tasks', 'fkey_constraint_task_project');
    await queryInterface.removeConstraint('UserTasks', 'fkey_constraint_usertasks_task');
    await queryInterface.removeConstraint('UserTasks', 'fkey_constraint_usertasks_project');
    await queryInterface.removeIndex('UserTasks', 'idex_unique_user_tasks');
  }
};
