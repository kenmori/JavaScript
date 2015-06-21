angular.module('app')
  .directive('bookItem', function () {
    return {
      restrict: 'EA',
      require: '^bookList',
      templateUrl: 'book_item.html',
      scope: {
        book: '=item',
        statuses: '='
      },
      link: function (scope, element, attrs, bookListCtrl) {
        scope.isEditMode = false;

        // (1) このディレクティブのスコープをbookListControllerに登録する
        bookListCtrl.addBookItem(scope);

        // (2) 編集モードの開始
        scope.startEdit = function () {
          // bookListControllerに、他に編集中のbookItemがないかどうかを問い合わせる
          if (bookListCtrl.anyDirty()) {
            scope.$emit('cannot-edit', '編集中のアイテムがあります', new Date);
            return;
          }
          bookListCtrl.allCancel();
          // 現在の値を保持しておく
          scope.backupBook = angular.copy(scope.book);
          scope.isEditMode = true;
        };

        // (3) 保存
        scope.save = function () {
          scope.isEditMode = false;
          scope.backupBook = null;
        };

        // (4) キャンセル
        scope.cancel = function () {
          if (!scope.isEditMode) {
            return;
          }
          // 保持しておいた値を戻す
          scope.book = scope.backupBook;
          scope.backupBook = null;
          scope.isEditMode = false;
        };

        // (5) 値が変更されているかどうか
        scope.isDirty = function () {
          if (!scope.isEditMode) {
            return false;
          }
          return !angular.equals(scope.book, scope.backupBook);
        };
      }
    }
  });
